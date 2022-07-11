/**
 * 当前页面主数据结构
 */
export interface DataSource {
  id: string;
  name: string;
  address: string;
  imgs: string[];
}

/**
 * 下拉框数据结构
 */
export interface SelectList {
  value: number;
  text: string;
}
