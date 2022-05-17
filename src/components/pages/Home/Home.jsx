import React, {useEffect, useState} from "react";
import { Table } from "antd";
import { Select } from 'antd';
import { useSort, useSortObject } from './utils';
const baseURL = 'https://api.sampleapis.com/movies';


export default function Home() {

const[ricks, setRicks] = useState([])
const [type, setType] = useState('animation')
const [searchTitle, setSearchTitle] = useState("");
const { Option } = Select;


useEffect (() => {
fetchData()
},[type])

const fetchData = () => {

fetch(`${baseURL}/${type}`)
    .then(resp => resp.json())
    .then(data => setRicks(data));
} 

const onChange = (value) => {
   console.log('value', value);
   setType(value);
}

const { list } = useSortObject(ricks, 'title', 'ASC');

      const columns = [
          {
            title: 'Image',
            dataIndex: 'posterURL',
            key: 'posterURL',
            render: (image) =>(
                <img src={image} alt=""  width={100}/>
            )
          },
          {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
              title: 'Type',
              dataIndex: 'imdbId',
              key: 'imdbId',
          },
        ];
    return(
        <div className="container">
             
              <Select     
                placeholder="Film Genre"
                onChange={onChange}
              >
                <Option value="animation">Animation</Option>
                <Option value="classic">  Classic..</Option>
                <Option value="comedy">   Comedy...</Option>
                <Option value="drama">    Drama....</Option>
                <Option value="horror">   Horror...</Option>
                <Option value="mystery">  Mystery..</Option>
            </Select>
           
             <input 
                    className="inputSearch" 
                    placeholder="Search Title&Type" 
                    type="text"
                    onChange={(e) => setSearchTitle(e.target.value)}
              />
             <Table 
                  dataSource={list.filter((value) => {
                  if (searchTitle === "") {
                    return value;
                  } else if (
                    value.title.toLowerCase().includes(searchTitle.toLowerCase()) || 
                    value.imdbId.toLowerCase().includes(searchTitle.toLowerCase())
                  ) {
                    return value;
                  }
                  })} 
                  columns={columns}
             />;
        </div>
    )
}