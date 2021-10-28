import React, { useState } from "react";
import { useParams } from "react-router";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Axios from "axios";
import UserActions from "../services/userAction";

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage({adminId}) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [QuantityValue, setQuantityValue] = useState(0)
    const [CategoryValue, setCategoryValue] = useState("")
    const [Image, setImage] = useState("")

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onQuantityChange = (event) => {
        setQuantityValue(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", TitleValue);
        formData.append("adminId", adminId);
    
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
    
            const { data } = await Axios.post("http://localhost:5000/api/v1/eShop/product/add/image", formData, config);
            setImage(data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue || 
             !QuantityValue || ! CategoryValue || !Image) {
            return alert('Error: All fields must be filled.')
        }

        const variables = {
            adminId: adminId,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            quantity: QuantityValue, 
            category: CategoryValue,
            image: Image
        }

        UserActions.addProduct(variables)
            .then(response => {
                if (response.data.success == "false") {
                    alert(response.data.error)
                }
                else {
                    alert('Product Successfully Uploaded')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
            

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <label>Quantity</label>
                <TextArea
                    onChange={onQuantityChange}
                    value={QuantityValue}
                    type="number"
                />
                <br />
                <br />
                <label>Category</label>
                <Input
                    onChange={onCategoryChange}
                    value={CategoryValue}
                />
                <br /><br />

                <label>Photo</label>
                <Input
                    onChange={updateImage}
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                />
                <br/>
                <br/>

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage;
