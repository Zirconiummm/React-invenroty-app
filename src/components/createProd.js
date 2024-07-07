import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import { toast } from 'react-toastify';


export default function DataForm(props){
    const apiUrl = 'http://localhost:5000/products';
    const [isAdded, setIsAdded] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [formData, setFormData] = useState({
        code: 0,
        name: '',
        amount: 0,
        weight: 0,
        width: 0,
        depth: 0,
        height: 0,
        category: '',
        material: ''
      });

      const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        if ( e.target.name == 'category'){
          setIsCategorySelected(true);
        }
        setFormData(prevState => ({
          ...prevState,
          [name]: val
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(apiUrl, formData);
          toast.success('Позицтя добавлена')
          setIsAdded(true);
        } catch (error) {
          if (error.response) {
            toast.error(`Ошибка при отправке данных: ${error.response.data.message}`);
          } else {
            toast.error('Ошибка при отправке данных');
          }
        }
      };
      useEffect(() => {
        if (isAdded) {
          props.getProd(props.filter);
          setIsAdded(false);
        }
      }, [isAdded, props.filter]); 


  return (
    <div className='modal'>
      <form onSubmit={handleSubmit} className="form-container">
      <button 
        className='close-button'
        onClick={() => props.setVisibleModal(false)}>
        X
      </button>
      <label>
          Код:
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Код"
            className="input-field"
          />
      </label>
      <label>
        Название:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Название"
          className="input-field"
        />
      </label>
      <label>
        Количество:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Количество"
          className="input-field"
        />
      </label>
      <label>
        Вес:
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Вес"
          className="input-field"
        />
      </label>
      <label>
        Ширина:
        <input
          type="number"
          name="width"
          value={formData.width}
          onChange={handleChange}
          placeholder="Ширина"
          className="input-field"
        />
      </label>
      <label>
        Глубина:
        <input
          type="number"
          name="depth"
          value={formData.depth}
          onChange={handleChange}
          placeholder="Глубина"
          className="input-field"
        />
      </label>
      <label>
        Высота:
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Высота"
          className="input-field"
        />
      </label>
      <label>
        Материал:
        <input
          type="text"
          name="material"
          value={formData.material}
          onChange={handleChange}
          placeholder="Материал"
          className="input-field"
        />
      </label>
      <label>
        Категория:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input-field"
        >
          {!isCategorySelected && <option value="">Выберите категорию</option>}
          <option value="Болты">Болты</option>
          <option value="Шайбы">Шайбы</option>
          <option value="Трубы">Трубы</option>
          <option value="Подшипники">Подшипники</option>
        </select>
      </label>
  <button type="submit" className="submit-button">Отправить данные</button>
</form>
    </div>
  );
};


