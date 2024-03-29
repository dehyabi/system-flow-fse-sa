import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Todo({ todo, toggleTodo }) {


    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (

            <div>
            <Row className="todo-wrapper">
                <Col className="mnxw-30 checkbox">
                    <div><input onChange={handleTodoClick} type="checkbox" checked={todo.complete} className="cust-checkbox" /></div>
                </Col>
                <Col className="main-todo">
                    <div>{todo.name}</div>
                </Col>
            </Row>
            </div>
    )
}

