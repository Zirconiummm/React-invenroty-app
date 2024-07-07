import { useEffect, useState } from "react";
import axios from "axios";



const Modal = ({ id, onClose, getProd, apiUrl, filter, setProduct}) => {
    const [productItem, setProductItem] = useState(null);
    const [isDleted, setIsDleted] = useState(false);
    
    const getProdItem = async () => {
        await axios.get(apiUrl + '/' + id,)
          .then((res) => {
            setProductItem(res.data); 
          });
      };
    const deleteItem = (id) => {
        axios.delete(apiUrl + '/' + id)
        .then(() => {
          setProduct(prevProducts => prevProducts.filter(product => product.id !== id));
          setIsDleted(true)
          onClose();
        })
        .catch(error => {
          console.error('Ошибка при удалении элемента:', error);
        });
    }
    useEffect(() => {
        getProdItem();
        if (isDleted) {
          getProd(filter);
          setIsDleted(false);
        }
      }, [isDleted, filter]); 

const [isEditing, setIsEditing] = useState(false);
const [editFormData, setEditFormData] = useState({
  code: '',
  name: '',
  amount: 0,
  weight: 0,
  width: 0,
  depth: 0,
  height: 0,
  category: '',
  material: ''
});

const editItem = (item) => {
  setEditFormData({
    code: item.code,
    name: item.name,
    amount: item.amount,
    weight: item.weight,
    width: item.width,
    depth: item.depth,
    height: item.height,
    category: item.category,
    material: item.material
  });
  setIsEditing(true);
};
const handleEditFormChange = (event) => {
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  setEditFormData({ ...editFormData, [fieldName]: fieldValue });
};

const saveEdits = async (id) => {
  await axios.put(apiUrl + '/' + id, editFormData)
    .then(() => {
      setIsEditing(false);
      getProdItem(); 
    })
    .catch(error => {
      console.error('Ошибка при сохранении изменений:', error);
    });
};
const editForm = (
  <div className="modal">
      <h2>Редактирование продукта</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        saveEdits(productItem?.id);
      }} className="form-container">
      <button 
        className='close-button'
        onClick={() => setIsEditing(false)}>
        X
      </button>
      <label>
        Код:
        <input
          name="code"
          value={editFormData.code}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Название:
        <input
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Количество:
        <input
          name="amount"
          value={editFormData.amount}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Вес:
        <input
          name="weight"
          value={editFormData.weight}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Ширина:
        <input
          name="width"
          value={editFormData.width}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Глубина:
        <input
          name="depth"
          value={editFormData.depth}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Высота:
        <input
          name="height"
          value={editFormData.height}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>

      <label>
        Материал:
        <input
          name="material"
          value={editFormData.material}
          onChange={handleEditFormChange}
          className="input-field"
        />
      </label>
      <label>
        Категория:
        <select
          name="category"
          value={editFormData.category}
          onChange={handleEditFormChange}
          className="input-field"
        >
          <option value="Болты">Болты</option>
          <option value="Шайбы">Шайбы</option>
          <option value="Трубы">Трубы</option>
          <option value="Подшипники">Подшипники</option>
        </select>
      </label>
      <button type="submit" className="submit-button">Сохранить изменения</button>
    </form>
  </div>
);
    return (
      <div className="modal">
        {isEditing ? editForm : (
          <div className="modal-content">
            <h2>Детали</h2>
            <p>Код: {productItem?.code}</p>
            <p>Название: {productItem?.name}</p>
            <p>Количество: {productItem?.amount}</p>
            <p>Вес: {productItem?.weight}</p>
            <p>Ширина: {productItem?.width}</p>
            <p>Глубина: {productItem?.depth}</p>
            <p>Высота: {productItem?.height}</p>
            <p>Категория: {productItem?.category}</p>
            <p>Материал: {productItem?.material}</p>
            <button onClick={onClose}>Закрыть</button>
          <button onClick={() => editItem(productItem)}>Изменить</button>
          <button onClick={() => deleteItem(productItem?.id)}>Удалить</button>
        </div>
      )}
      </div>
    );
  };
  export default Modal;