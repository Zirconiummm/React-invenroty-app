import React, { useState } from 'react';
import '../css/style.css';

// Компонент фильтрации
const Filters = ({ getProd}) => {
  const [filterColumn, setFilterColumn] = useState('');
  const [filterGtr, setFilterGtr] = useState(0);
  const [filterLs, setFilterLs] = useState(0);
  const [category, setCategory] = useState('');

  // Обработчик изменения фильтров
  const handleFilterChange = (e) => {
    setFilterColumn(e.target.value);
  };
  const handleFilterApply = () => {
    getProd({ filterColumn, filterGtr, filterLs, category });
  };
  const handleResetFilters = () => {
    setFilterColumn('');
    setFilterGtr(0);
    setFilterLs(0);
    setCategory('');
    getProd({ filterColumn: '', filterGtr: 0, filterLs: 0, category: '' });
  };

  return (
    <div className="filter-container">
      <label htmlFor={'start'}>От</label>
      <input
        className="input-filter"
        value={filterGtr}
        name={'start'}
        onChange={(e) => setFilterGtr(parseFloat(e.target.value))}
      />
      <label htmlFor={'end'}>До</label>
      <input
        className="input-filter"
        value={filterLs}
        name={'end'}
        onChange={(e) => setFilterLs(parseFloat(e.target.value))}
      />
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            value='amount'
            checked={filterColumn === 'amount'}
            onChange={handleFilterChange}
          /> Количество
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value='weight'
            checked={filterColumn === 'weight'}
            onChange={handleFilterChange}
          /> Вес
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value='width'
            checked={filterColumn === 'width'}
            onChange={handleFilterChange}
          /> Ширина
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value='depth'
            checked={filterColumn === 'depth'}
            onChange={handleFilterChange}
          /> Длина
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value='height'
            checked={filterColumn === 'height'}
            onChange={handleFilterChange}
          /> Высота
        </label>
      </div>
      <select className="select-category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Выберите категорию</option>
        <option value="Болты">Болты</option>
        <option value="Шайбы">Шайбы</option>
        <option value="Трубы">Трубы</option>
        <option value="Подшипники">Подшипники</option>
      </select>

      {/* Кнопка применения фильтров */}
      <button className="button-apply" onClick={handleFilterApply}>
        Применить фильтры
      </button>
      <button className="button-reset" onClick={handleResetFilters }>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;