import { API, FileInfo, Options } from 'jscodeshift'

function transform(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift

  const root = j(file.source)

  function defineGlobal(variableName: string) {
    root.get().node.program.body.push(`global.${variableName} = ${variableName}`)
  }

  root
    .find(j.Identifier)
    .forEach(path => {
      if (path.scope.isGlobal) {
        defineGlobal(path.value.name)
      }
    })

  root
    .find(j.FunctionDeclaration)
    .forEach(path => {
      if (path.parentPath.scope.isGlobal) {
        defineGlobal(path.value.id.name)
      }
    })

  return root.toSource()
}

module.exports = transform
