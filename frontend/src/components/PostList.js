import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    DateField, 
    EditButton,
    DeleteButton} 
     from 'react-admin'


const PostList = (props) => {
    
        return <List {...props}>
            <Datagrid>
               <TextField souce='id'/>   
               <TextField souce='title'/>
               <DateField souce='publishedAt'/>
               <EditButton basePath='/posts' />
               <DeleteButton basePath ='/posts' />
            </Datagrid>

        </List>
        
    }

export default PostList;