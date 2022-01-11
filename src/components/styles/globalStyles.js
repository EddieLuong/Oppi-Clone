import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: Montserrat!important;
    font-size: 14px;
    font-weight: 500;
    line-height:1.5;
  }
  html{
    font-size: 16px;
  }
  :root {
  --blue: #20a8d8;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #f86c6b;
  --orange: #f8cb00;
  --yellow: #ffc107;
  --green: #4dbd74;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #73818f;
  --gray-dark: #2f353a;
  --light-blue: #63c2de;
  --primary: #20a8d8;
  --secondary: #c8ced3;
  --success: #4dbd74;
  --info: #63c2de;
  --warning: #ffc107;
  --danger: #f86c6b;
  --light: #f0f3f5;
  --dark: #2f353a;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

  #root{
    width: 100%;
    height:100%;
  }
  .pollist{
    display: inline-block;
    width:100%;
    background-color:#f5f6f9;
  }
  .pollist_nav{
    display: block;
    height: 55px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .MuiTableRow-root.MuiTableRow-hover{
    border-left: 1px solid #fff;
  }
  .MuiTableRow-root.MuiTableRow-hover:hover{
    border-left:1px solid #42B5E8 !important;
  }
`;

export default GlobalStyle;
