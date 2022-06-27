import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Demo2: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const { Option } = Select;
  let dataSource1: DataSource[] = [];
  let selectList: SelectList[] = [];
  const options = selectList.map((d) => <Option key={d.value}>{d.text}</Option>);
  /**
   * 列表结构
   */
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'sqlId',
      key: 'sqlId',
      with: 120,
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'imgs',
      key: 'imgs',
      render: (text: string[]) => {
        return (
          <div style={{ display: 'flex' }}>
            {text.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ width: '100px', height: '100px', marginLeft: '4px', overflow: 'hidden' }}
                >
                  <img style={{ width: '100%' }} src={item} />
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];
  /**
   * React 保证了每次运行 useEffect 的同时，DOM 都已经更新完毕。
   */
  useEffect(() => {
    initData();
    getListData();
  }, []);
  /**
   * 初始化数据
   */
  function initData() {
    dataSource1 = [
      {
        sqlId: '1',
        name: '黄容',
        address: '10 Downing Street',
        imgs: [],
      },
      {
        sqlId: '2',
        name: 'John',
        address: '10 Downing Street',
        imgs: [],
      },
    ];

    selectList = [
      {
        value: 1,
        text: '选项1',
      },
      {
        value: 2,
        text: '选项2',
      },
      {
        value: 3,
        text: '选项3',
      },
    ];
  }
  /**
   * 请求后台获取
   */
  function getListData() {
    let list: DataSource[] = dataSource1;
    for (let i = 0; i < 10; i++) {
      list = list.concat(list);
    }
    setDataSource(list);
  }

  function handleSearch() {
    console.log('111111111111111111');
  }

  function handleChange() {
    console.log('2222222222222222222222222');
  }
  /**
   * 界面布局
   */
  return (
    <div className={styles.container}>
      {/* 搜索区域 */}
      <div className={styles.search_area}>
        <Form.Item
          className={styles.search_box_number}
          label="ID"
          name="sqlId"
          tooltip={'唯一标志id'}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item className={styles.search_box} label="名称" name="sqlId">
          <Input />
        </Form.Item>
        <Form.Item className={styles.search_box} label="地址" name="address">
          <Input />
        </Form.Item>
        <Form.Item className={styles.search_box} label="搜索下拉框" name="address">
          <Select
            showSearch
            // value={value}
            // placeholder={props.placeholder}
            // style={props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
          >
            {options}
          </Select>
        </Form.Item>
        <Form.Item className={styles.search_box} label="下拉框" name="address">
          <Select allowClear showSearch placeholder="下拉选择">
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        </Form.Item>
      </div>
      {/* 按钮区 */}
      <div className={styles.btn_area}>
        <Form.Item className={styles.btn}>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item className={styles.btn}>
          <Button type="primary">新增</Button>
        </Form.Item>
      </div>
      {/* 列表区 */}
      <Table className={styles.table_area} dataSource={dataSource} columns={columns} />
      {/* 弹框区 */}
    </div>
  );
};

export default Demo2;
