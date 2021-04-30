import React, {} from 'react'

import typescript from 'typescript'

interface Props {}



const Editor: React.FC<Props> = (props) => {

    const source = 'let v = 1234';
    const ast = typescript.createSourceFile('index.ts', source, typescript.ScriptTarget.ES2016)
    typescript.forEachChild(ast, (node)=>{
        console.log(typescript.SyntaxKind[node.kind])
    })

    return (
        <pre>
            {
                JSON.stringify(ast, null, 4)
            }
        </pre>
    )
}

export default Editor
