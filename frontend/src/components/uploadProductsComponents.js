import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
//import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        images: [],
        price: 0,
        quantity: 0,
        category: ''
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeQuantity = (event) => {
        this.setState({quantity: parseInt(event.currentTargetValue, 10) })
    }

    handleChangeCategory = (event) => {
        this.setState({ category: event.currentTarget.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.images || !this.state.price ||
            !this.state.quantity || !this.state.category) {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            price: this.state.price,
            quantity: this.state.quantity, 
            category: this.state.category
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Failed to upload video')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Product</Title>
            </div>

            <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Price($)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <label>Quantity</label>
                <Input
                    onChange={this.handleChangeQuantity}
                    value={this.state.quantity}
                    type="number"
                />
                <br /><br />
                <label>Category</label>
                <Input
                    onChange={this.handleChangeCategory}
                    value={this.state.category}
                />
                <br /><br />
                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
        )
    }
}

export default UploadProductPage
