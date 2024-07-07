import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as math from 'mathjs';
import '../table/style.css'
import SearchComponent from '../searcg';
import DataForm from '../createProd';
import Modal from '../item';
//import Filters from '../filters';

export default function Table() {  
  const apiUrl = 'http://localhost:5000/products';
  const [product, setProduct] = useState(null);

  const [allItem, setAllItem] = useState(null)
  const [curPage, setCurPage] = useState(1);
  const [visibleModal, setVisibleModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({});
  const [modalData, setModalData] = useState(null);

  const [filterColumn, setFilterColumn] = useState('');
  const [filterGtr, setFilterGtr] = useState(0);
  const [filterLs, setFilterLs] = useState(0);
  const [category, setCategory] = useState('');


  const [filter, setFilter] = useState({
    page: 1,
    sortColumn: '',
    sortOrder: 'ASC',
    filterColumn: '',
    filterGtr: 0,
    filterLs: 0,
    category: '',
    search: '',
  });

  const getProd = async (newFilter) => {
    await axios.get(apiUrl, { params: newFilter })
      .then((res) => {
        setAllItem(res.data['count'])
        setProduct(res.data['rows']); 
      });
  };



  useEffect(() => {
    getProd(filter);
  }, [filter,sortConfig]);



  if (!product || typeof product !== 'object') {
    return <p>Product data is not available.</p>;
  }
      
  const recordPerPage = 3
  const npage = math.ceil(allItem / recordPerPage)
  const numbers = [...Array(npage +1).keys()].slice(1)
  
  const handleSort = (sortColumn) => {
    setSortConfig(prevConfig => {
      const isAsc = prevConfig.column === sortColumn && prevConfig.order === 'ASC';
      const nextOrder = isAsc ? 'DESC' : 'ASC';
      setFilter(prevFilter => ({
        ...prevFilter,
        sortOrder: nextOrder,
        sortColumn: sortColumn
      }));
      return {
        column: sortColumn,
        order: nextOrder
      };
    });
  };
  const getButtonText = (column) => {
    console.log(column)
    console.log(sortConfig.column)
    if (sortConfig.column === column) {
      return sortConfig.order === 'ASC' ? ' 🔼' : ' 🔽';
    }
    return '';
  };



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

  function nextPage(){
    if(curPage !== npage){
      setCurPage(curPage +1)
      setFilter(prevFilter => ({
        ...prevFilter,
        page: curPage +1,
        filterColumn: filterColumn,
        filterGtr: filterGtr,
        filterLs: filterLs,
        category: category
      }));
    }
  }
  function prePage(){
    if(curPage !== 1){
      setCurPage(curPage -1)
      setFilter(prevFilter => ({
        ...prevFilter,
        page: curPage -1,
        filterColumn: filterColumn,
        filterGtr: filterGtr,
        filterLs: filterLs,
        category: category
      }));
    }
  }
  function changeCurPage(id){
    setCurPage(id)
    setFilter(prevFilter => ({
      ...prevFilter,
      page: id,
      filterColumn: filterColumn,
      filterGtr: filterGtr,
      filterLs: filterLs,
      category: category
    }));
  }



  const handleRowClick = (item) => {
    setModalData(item);
  };
  
  const handleCloseModal = () => {
    setModalData(null);
  };
  const columns = [
    { key: 'code', text: 'Код' },
    { key: 'name', text: 'Название' },
    { key: 'amount', text: 'Количество шт' },
    { key: 'weight', text: 'Вес кг' },
    { key: 'width', text: 'Ширина мм' },
    { key: 'depth', text: 'Длина мм' },
    { key: 'height', text: 'Высота мм' },
    { key: 'category', text: 'Категория' },
    { key: 'material', text: 'Материал' },
  ];


  return (
    <div>
      <div className='block'>
        <SearchComponent setFilter={setFilter}/>
        <button className="btn" onClick={() => setVisibleModal(true)}>Добавить Элемент</button>
      </div>
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
      <table>
        <thead>
        <tr>
        {columns.map(({ key, text }) => (
          <th key={key}>
            <button className='sort-btn' onClick={() => handleSort(key)}>
              {text}
            </button>
          </th>
        ))}
      </tr>
        </thead>
        <tbody>
        {product.map((productItem,i)=>
            <tr key={i} onClick={() => handleRowClick(productItem.id)}>
              <td>{productItem.code}</td>
              <td>{productItem.name}</td>
              <td>{productItem.amount}</td>
              <td>{productItem.weight}</td>
              <td>{productItem.width}</td>
              <td>{productItem.depth}</td>
              <td>{productItem.height}</td>
              <td>{productItem.category}</td>
              <td>{productItem.material}</td>
            </tr>
          )}
        </tbody>
      </table>
      {modalData && <Modal id={modalData} onClose={handleCloseModal} apiUrl={apiUrl} setProduct={setProduct} filter={filter}  getProd={getProd}/>}
      <nav>
        <ul className='pagination'>
          <li>
            <button onClick={prePage}>Prev</button>
          </li>
            {numbers.map((n, i) => (
              <li key={i} className={curPage === n ? 'active' : ''}>
                <button onClick={() => changeCurPage(n)}>{n}</button>
              </li>
            ))}
          <li>
            <button onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
      
      {visibleModal && (
       <DataForm setVisibleModal={setVisibleModal} getProd={getProd} setFilter={setFilter} curPage={curPage}/>
      )}
      
    </div>
    
  );
}
