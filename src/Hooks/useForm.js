import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value,
  });
};

const handleOnImgChange = ({ e, setImages }) => {
  const { files } = e.target;
  setImages(files);
};
const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);

  return {
    form,
    images,
    setForm,
    setImages,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
    handleOnImgChange: (e) => handleOnImgChange({ e, setImages }),
  };
};

export default useForm;
