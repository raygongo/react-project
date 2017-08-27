// 顶层app
import React from 'react';
import AddTodo from '@/containers/AddTodo';
import VisibleTodoList from '@/containers/VisibleTodoList';
import Footer from '@/components/Footer';


const Redux = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>        
    </div> 
)

export default Redux