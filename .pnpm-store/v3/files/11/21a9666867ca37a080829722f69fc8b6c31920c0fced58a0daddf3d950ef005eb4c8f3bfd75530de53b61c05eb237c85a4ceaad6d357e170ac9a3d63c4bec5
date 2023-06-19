"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMetadataPrinter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const ts = require("typescript");
const SERIALIZED_METADATA_FILENAME = 'metadata.ts';
/**
 * Prints the metadata to a file.
 */
class PluginMetadataPrinter {
    print(metadata, options) {
        const objectLiteralExpr = ts.factory.createObjectLiteralExpression(Object.keys(metadata).map((key) => this.recursivelyCreatePropertyAssignment(key, metadata[key])));
        const exportAssignment = ts.factory.createExportAssignment(undefined, undefined, objectLiteralExpr);
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
        });
        const resultFile = ts.createSourceFile('file.ts', '', ts.ScriptTarget.Latest, 
        /*setParentNodes*/ false, ts.ScriptKind.TS);
        const filename = (0, path_1.join)(options.outputDir, options.filename ?? SERIALIZED_METADATA_FILENAME);
        const eslintPrefix = `/* eslint-disable */\n`;
        (0, fs_1.writeFileSync)(filename, eslintPrefix +
            printer.printNode(ts.EmitHint.Unspecified, exportAssignment, resultFile));
    }
    recursivelyCreatePropertyAssignment(identifier, meta) {
        if (Array.isArray(meta)) {
            return ts.factory.createPropertyAssignment(ts.factory.createStringLiteral(identifier), ts.factory.createArrayLiteralExpression(meta.map(([importExpr, meta]) => ts.factory.createArrayLiteralExpression([
                importExpr,
                ts.factory.createObjectLiteralExpression(Object.keys(meta).map((key) => this.recursivelyCreatePropertyAssignment(key, meta[key]))),
            ]))));
        }
        return ts.factory.createPropertyAssignment(ts.factory.createStringLiteral(identifier), ts.isObjectLiteralExpression(meta)
            ? meta
            : ts.factory.createObjectLiteralExpression(Object.keys(meta).map((key) => this.recursivelyCreatePropertyAssignment(key, meta[key]))));
    }
}
exports.PluginMetadataPrinter = PluginMetadataPrinter;
