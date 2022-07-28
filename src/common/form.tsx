export const validateMessages = {
  required: '${label} 不能为空！',
  types: {
    email: '${label} 不是有效邮件！',
    number: '${label} 不是有效数字！',
  },
  number: {
    range: '${label} 必须在 ${min} 和 ${max} 之间！',
  },
};

export const paginationProps = {
  showSizeChanger: true, // 是否展示 pageSize 切换器
  showQuickJumper: true, //是否可以快速跳转至某页
  current: 1,
  pageSize: 10,
  // pageSizeOptions: [10, 20, 50, 100],
  showTotal: (total: number) => `共${total}条`,
  onChange: function (page: number, pageSize: number) {
    this.current = page;
    this.pageSize = pageSize;
  },
};
