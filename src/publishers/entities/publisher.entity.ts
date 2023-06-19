import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PublisherEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    about: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    website: string;

    @Prop({ required: false })
    logoUrl: string;
}

export type PublisherDocument = PublisherEntity & Document;

export const PublisherSchema = SchemaFactory.createForClass(PublisherEntity);
