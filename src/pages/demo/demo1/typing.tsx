/**
 * 当前页面主数据结构
 */
export interface DataSource {
  id: string;
  name: string;
  address: string;
  imgs: string[];
}

export interface SearchData {
  id?: string;
  name?: string;
  address?: string;
  age?: string;
  moreInfo?: string;
}

/**
 * 下拉框数据结构
 */
export interface SelectList {
  value: number;
  text: string;
}
