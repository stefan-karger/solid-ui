import type { Transformer } from "@/utils/transformers"

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue()

    if (moduleSpecifier.startsWith("@/registry/")) {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^~\/registry\/ui/, config.aliases.components)
      )
    } else if (moduleSpecifier === "@/lib/utils") {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^~\/lib\/utils/, config.aliases.utils)
      )
    }
  }
  return sourceFile
}
