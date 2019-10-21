import React, { useState } from "react";
import ReactDOM from "react-dom";

// User can create a post
// User can comment post
// User can commnet a comment
// User can like a post or comment

// Post { author, content }
// Comment { author, content }
// Node


function App(){
    const [counter, setCount] = useState(0);
    const [nodes, setNodes] = useState([]);
    const handleChange = (id, node) => {
        //console.log( 'state', useState() );
        setNodes(nodes.map(loopNode =>
            loopNode.id === id ? node : loopNode
        ));
        setCount(counter +1);
    };
    const handleSubmit = node => {
        setNodes([...nodes, node]);
        setCount(counter +1);
    };
    return (
        <div>
            <p>Changes Made Counter: {counter}</p>
            <NodeForm onSubmit={handleSubmit} />
            {nodes.map(node => <Node onChange={handleChange} key={node.id} node={node} />)}
        </div>
    );

}
function Node(props){
    const handleSubmit = nodeParam => {
        let { onChange, node } = props;
        onChange(
            node.id, {
            ...node,
            nodes: [...node.nodes, nodeParam]
            }
        );
    };
    const handleChangeNode = (id, nodeParam) => {
        let { onChange, node } = props;
        onChange(
            node.id, {
                ...node,
                nodes: node.nodes.map(loopNode =>
                    loopNode.id === id ? nodeParam : loopNode
                )
            } 
        )
    };
    const handleClickLike = () => {
        let { onChange, node } = props;
        let confgureNode = node;
        confgureNode.likeCounter += 1; 
        onChange(
            node.id, {
            ...confgureNode,
            nodes: node.nodes
            }
        );
    }
    return (
        <div style={{ marginLeft: 18 }}>
            <p>{props.node.author}</p>
            <p>{props.node.content}</p>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleClickLike}>Likes {props.node.likeCounter}</button>
            </div>
            <NodeForm onSubmit={handleSubmit} />
            {props.node.nodes.map(node => <Node onChange={handleChangeNode} key={node.id} node={node} />)}
        </div>
    );
}

function NodeForm (props){
    const [author, setAuthor] = useState(''); 
    const [content, setContent] = useState(''); 

    const handleSubmit = e => {
        e.preventDefault();
        let state = { author, content }
        props.onSubmit({ ...state, id: Math.random(), nodes: [], likeCounter: 0 });
        setAuthor('')
        setContent('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="author"
            />
            <input
                type="text"
                name="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="content"
            />
            <input type="submit" />
        </form>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


