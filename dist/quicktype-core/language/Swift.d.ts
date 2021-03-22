import { TargetLanguage } from "../TargetLanguage";
import { Type, ClassType, EnumType, UnionType, TypeKind, ClassProperty } from "../Type";
import { Name, Namer } from "../Naming";
import { BooleanOption, EnumOption, Option, StringOption, OptionValues } from "../RendererOptions";
import { Sourcelike } from "../Source";
import { ConvenienceRenderer, ForbiddenWordsInfo } from "../ConvenienceRenderer";
import { RenderContext, ForEachPosition } from "../Renderer";
import { StringTypeMapping } from "../TypeBuilder";
import { DateTimeRecognizer } from "../DateTime";
import { AcronymStyleOptions } from "../support/Acronyms";
export declare const swiftOptions: {
    justTypes: BooleanOption;
    convenienceInitializers: BooleanOption;
    explicitCodingKeys: BooleanOption;
    urlSession: BooleanOption;
    alamofire: BooleanOption;
    namedTypePrefix: StringOption;
    useClasses: EnumOption<boolean>;
    mutableProperties: BooleanOption;
    acronymStyle: EnumOption<AcronymStyleOptions>;
    dense: EnumOption<boolean>;
    linux: BooleanOption;
    objcSupport: BooleanOption;
    swift5Support: BooleanOption;
    multiFileOutput: BooleanOption;
    accessLevel: EnumOption<string>;
    protocol: EnumOption<{
        equatable: boolean;
        hashable: boolean;
    }>;
};
export interface SwiftProperty {
    name: Name;
    jsonName: string;
    parameter: ClassProperty;
    position: ForEachPosition;
}
export declare class SwiftTargetLanguage extends TargetLanguage {
    constructor();
    protected getOptions(): Option<any>[];
    readonly stringTypeMapping: StringTypeMapping;
    readonly supportsOptionalClassProperties: boolean;
    readonly supportsUnionsWithBothNumberTypes: boolean;
    protected makeRenderer(renderContext: RenderContext, untypedOptionValues: {
        [name: string]: any;
    }): SwiftRenderer;
    readonly dateTimeRecognizer: DateTimeRecognizer;
}
export declare class SwiftRenderer extends ConvenienceRenderer {
    protected readonly _options: OptionValues<typeof swiftOptions>;
    protected _currentFilename: string | undefined;
    protected _needAny: boolean;
    protected _needNull: boolean;
    constructor(targetLanguage: TargetLanguage, renderContext: RenderContext, _options: OptionValues<typeof swiftOptions>);
    protected forbiddenNamesForGlobalNamespace(): string[];
    protected forbiddenForObjectProperties(_c: ClassType, _classNamed: Name): ForbiddenWordsInfo;
    protected forbiddenForEnumCases(_e: EnumType, _enumName: Name): ForbiddenWordsInfo;
    protected forbiddenForUnionMembers(_u: UnionType, _unionName: Name): ForbiddenWordsInfo;
    protected makeNamedTypeNamer(): Namer;
    protected namerForObjectProperty(): Namer;
    protected makeUnionMemberNamer(): Namer;
    protected makeEnumCaseNamer(): Namer;
    protected isImplicitCycleBreaker(t: Type): boolean;
    protected emitDescriptionBlock(lines: Sourcelike[]): void;
    protected emitBlock(line: Sourcelike, f: () => void): void;
    protected emitBlockWithAccess(line: Sourcelike, f: () => void): void;
    protected justTypesCase(justTypes: Sourcelike, notJustTypes: Sourcelike): Sourcelike;
    protected readonly lowerNamingFunction: Namer;
    protected swiftPropertyType(p: ClassProperty): Sourcelike;
    protected swiftType(t: Type, withIssues?: boolean, noOptional?: boolean): Sourcelike;
    protected proposedUnionMemberNameForTypeKind(kind: TypeKind): string | null;
    protected renderSingleFileHeaderComments(): void;
    protected renderHeader(type: Type, name: Name): void;
    protected renderTopLevelAlias(t: Type, name: Name): void;
    protected getProtocolsArray(_t: Type, isClass: boolean): string[];
    protected getProtocolString(_t: Type, isClass: boolean): Sourcelike;
    protected getEnumPropertyGroups(c: ClassType): {
        name: Name;
        label?: string | undefined;
    }[][];
    protected readonly accessLevel: string;
    protected readonly objcMembersDeclaration: string;
    protected startFile(basename: Sourcelike): void;
    protected endFile(): void;
    protected propertyLinesDefinition(name: Name, parameter: ClassProperty): Sourcelike;
    protected renderClassDefinition(c: ClassType, className: Name): void;
    protected initializableProperties(c: ClassType): SwiftProperty[];
    protected emitNewEncoderDecoder(): void;
    protected emitConvenienceInitializersExtension(c: ClassType, className: Name): void;
    protected renderEnumDefinition(e: EnumType, enumName: Name): void;
    protected renderUnionDefinition(u: UnionType, unionName: Name): void;
    protected emitTopLevelMapAndArrayConvenienceInitializerExtensions(t: Type, name: Name): void;
    protected emitDecodingError(name: Name): void;
    protected emitSupportFunctions4: () => void;
    protected emitConvenienceMutator(c: ClassType, className: Name): void;
    protected emitMark(line: Sourcelike, horizontalLine?: boolean): void;
    protected emitSourceStructure(): void;
    protected emitURLSessionExtension(): void;
    protected emitAlamofireExtension(): void;
}
