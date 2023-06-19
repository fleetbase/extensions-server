import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublisherEntity, PublisherDocument } from './entities/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PublishersService {
    constructor(@InjectModel(PublisherEntity.name) private publisherModel: Model<PublisherDocument>) {}

    async create(createPublisherDto: CreatePublisherDto, file: Express.Multer.File): Promise<PublisherEntity> {
        const hashedPassword = await bcrypt.hash(createPublisherDto.password, 10); // Hash the password with a salt round of 10
        const createdPublisher = new this.publisherModel({
            ...createPublisherDto,
            password: hashedPassword, // Store the hashed password
        });

        const logoUrl = await this.handleFileUpload(file);
        createdPublisher.logoUrl = logoUrl;

        return createdPublisher.save();
    }

    private async handleFileUpload(file: Express.Multer.File): Promise<string> {
        // This example saves the file locally in a `public/uploads` directory.
        // Adjust this to your own needs. For example, you might want to save the file to a cloud storage service.
        const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
        const filePath = path.join(uploadDir, file.originalname);

        // Ensure the upload directory exists.
        fs.mkdirSync(uploadDir, { recursive: true });

        // Write the file.
        await fs.promises.writeFile(filePath, file.buffer);

        // Return the URL where the file can be accessed. Adjust this to your own needs.
        return `/uploads/${file.originalname}`;
    }
}
