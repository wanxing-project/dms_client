import { paginationProps, validateMessages } from '@/common/form';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, InputNumber, message, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { add, getList } from './api';
import styles from './index.less'; // 告诉 umi 编译这个 less
import { DataSource, SearchData, SelectList } from './typing';

const Demo1: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const { Option } = Select;
  let selectList: SelectList[] = [];
  const options = selectList.map((d) => <Option key={d.value}>{d.text}</Option>);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formData] = Form.useForm();
  const [formDataValue, setFormDataValue] = useState<DataSource>();
  const [searchData] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const layout = {
    // 会分成24等分 labelCol 和 wrapperCol 是几就分几份 没分到的地方留白
    labelCol: {
      span: 6, // 冒号对齐
      // offset: 2 // label 距离边框的距离
    },
    wrapperCol: {
      span: 16, // 输入框的长度
      // offset: 2 // 输入框距离 label 的距离
    },
  };
  /**
   * React 保证了每次运行 useEffect 的同时，DOM 都已经更新完毕。
   */
  useEffect(() => {
    initData();
    search();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  /**
   * 初始化数据
   */
  function initData() {
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
  async function search() {
    setLoading(true);
    try {
      const param: SearchData = searchData.getFieldsValue();
      console.log('param', param);
      const searchParam = {
        condition: param,
        size: paginationProps.pageSize,
        pageIndex: paginationProps.current,
      };
      const result: any = await getList(searchParam);
      if (result.status === 200) {
        if (result.data && Array.isArray(result.data)) {
          setDataSource(result.data);
          setLoading(false);
        } else {
          setDataSource([]);
        }
      } else {
        message.error(result.message);
      }
    } catch (err) {
      message.error('系统错误');
      console.log('系统错误:', err);
    }
  }

  function handleSearch() {
    console.log('111111111111111111');
  }

  function handleChange() {
    console.log('2222222222222222222222222');
  }

  async function onSubmit(values: any) {
    // formData.getFieldsValue() 等于 values
    const param = values;
    try {
      console.log(param);
      const result: any = await add(param);
      console.log(result);
      if (result.status === 200) {
        message.success('添加成功');
        setShowAddModal(false);
        search();
      } else {
        message.error(result.message);
      }
    } catch (err) {
      message.error('系统错误');
      console.log('系统错误:', err);
    }
  }

  function openModifyPanel(record: DataSource) {
    console.log('修改', record);
    const data: DataSource = Object.assign(record, {});
    setFormDataValue(data);
    setShowAddModal(true);
  }

  function operate() {
    console.log('发布，下架，删除');
  }

  /**
   * 列表结构
   */
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
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
      render: (text: string) => {
        //text：该键的值; record：该列的值
        // console.log(text);
        if (text) {
          const list = JSON.parse(text);
          return (
            <div style={{ display: 'flex' }}>
              {list?.map((item: string, index: number) => {
                return (
                  <div
                    key={`key${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      marginLeft: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image style={{ width: '100%' }} src={item} />
                  </div>
                );
              })}
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: '其他信息',
      dataIndex: 'moreInfo',
      key: 'moreInfo',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: DataSource) => (
        <>
          <Button
            className={styles.action_btn}
            type="primary"
            onClick={() => {
              openModifyPanel(record);
            }}
          >
            修改
          </Button>
          <Button className={styles.action_btn} type="primary" onClick={operate}>
            发布
          </Button>
        </>
      ),
    },
  ];
  /**
   * 界面布局
   */
  return (
    <div className={styles.container}>
      {/* 搜索区域 */}
      <div>
        <Form className={styles.search_area} form={searchData}>
          <Form.Item
            className={styles.search_box_number}
            label="ID"
            name="id"
            tooltip={'唯一标志id'}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item className={styles.search_box} label="名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item className={styles.search_box} label="地址" name="address">
            <Input />
          </Form.Item>
          <Form.Item className={styles.search_box} label="年龄" name="age">
            <Select
              allowClear // 支持清除
              showSearch // 使单选模式可搜索
              placeholder="下拉选择" // 选择框默认文本
            >
              <Option value="177">{'<18'}</Option>
              <Option value="18">{18}</Option>
              <Option value="19">{19}</Option>
              <Option value="20">{20}</Option>
              <Option value="21">{21}</Option>
              <Option value="22">{22}</Option>
              <Option value="23">{23}</Option>
              <Option value="24">{24}</Option>
              <Option value="255">{'>24'}</Option>
            </Select>
          </Form.Item>
          <Form.Item className={styles.search_box} label="其他信息" name="moreInfo">
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
        </Form>
      </div>
      {/* 按钮区 */}
      <div className={styles.btn_area}>
        <Button
          className={styles.btn}
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => {
            search();
          }}
        >
          搜索
        </Button>
        <Button
          className={styles.btn}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          新增
        </Button>
      </div>
      {/* 列表区 */}
      <Table
        className={styles.table_area}
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
        bordered
        pagination={paginationProps}
      />
      {/* 弹框区 */}
      {/* <Modal /> 和 Form 一起配合使用时，设置 destroyOnClose 也不会在 Modal 关闭时销毁表单字段数据，需要设置 <Form preserve={false} />。 */}
      <Modal
        title="新增宿舍信息"
        visible={showAddModal}
        onOk={() => {
          formData.submit();
        }} // 响应Form标签的onFinish方法
        onCancel={() => {
          setShowAddModal(false);
        }}
        destroyOnClose
        keyboard={false}
        maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          form={formData}
          onFinish={onSubmit}
          validateMessages={validateMessages} // 为空数据校验
          preserve={false}
          initialValues={formDataValue}
        >
          <Form.Item name="id" label="id">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="address" label="家庭住址">
            <Input />
          </Form.Item>
          <Form.Item name="moreInfo" label="补充说明">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Demo1;
