import React from 'react'
import {connect} from 'react-redux'

import {addTodo} from '@/actions'

let AddTodo = ( {dispatch} )=> {
    let input ;
    return (
        <div>
            <form onSubmit={ e => {
                    e.preventDefault();
                    if(!input.value.trim()) return
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}>
                <input ref={node=> input = node} style={{border:'1px solid #ddd'}}/>
                <button type="submit">添加</button>
            </form>    
        </div>    
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo 