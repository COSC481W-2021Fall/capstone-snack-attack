import React, { useState } from "react";
import { useParams } from "react-router";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Axios from "axios";
import UserActions from "../services/userAction";

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [QuantityValue, setQuantityValue] = useState(0);
  const [CategoryValue, setCategoryValue] = useState("");
  const [Images, setImages] = useState([]);

  const adminId = useParams();

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onQuantityChange = (event) => {
    setQuantityValue(event.currentTarget.value);
  };

  const onCategoryChange = (event) => {
    setCategoryValue(event.currentTarget.value);
  };

  const updateImages = (event) => {
    setImages(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !QuantityValue ||
      !CategoryValue ||
      !Images
    ) {
      return alert("Error: All fields must be filled.");
    }

    const variables = {
      adminId: adminId.adminId,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      quantity: QuantityValue,
      category: CategoryValue,
      image: Images,
    };

    UserActions.addProduct(variables).then((response) => {
      console.log(response.data);
      if (response.data.success == "false") {
        alert(response.data.error);
      } else {
        alert("Product Successfully Uploaded");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <label>Quantity</label>
        <TextArea onChange={onQuantityChange} value={QuantityValue} type="number" />
        <br />
        <br />
        <label>Category</label>
        <Input onChange={onCategoryChange} value={CategoryValue} />
        <br />
        <br />

        <label>Photo</label>
        <Input
          onChange={updateImages}
          value={Images}
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
        />
        <br />
        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>

      <img src={Images}></img>
    </div>
  );
}

export default UploadProductPage;
