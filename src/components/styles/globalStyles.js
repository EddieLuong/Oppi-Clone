import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: Montserrat!important;
    font-size: 16px;
    font-weight: 500;
    line-height:1.5;
  }
  html{
    font-size: 17px;
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
    display: inline-flex;
    width:100%;
    background-color:#f5f6f9;
    flex-direction: column;
    align-items: center;
  }
  .pollist_nav{
    display: block;
    height: 55px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    width: inherit;
  }
  .MuiTableRow-root.MuiTableRow-hover{
    border-left: 1px solid #fff;
  }
  .MuiTableRow-root.MuiTableRow-hover:hover{
    border-left:1px solid #42B5E8 !important;
  }
  td.MuiTableCell-body{
    vertical-align: top
  }
  .statusCell{
    padding: 3px 2px;
    border-radius: 1rem;
    font-size: 13px;
  }
  .statusCell p {
    margin-bottom:0;
  }
  .boxAction p {
    margin-bottom: 0;
  }
  .pagination{
    margin: -40px 0 40px;
  }
  button.MuiPaginationItem-page{
    font-weight: bold;
    opacity:1;
    background-color: #fff;
    box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
  }
  button.MuiPaginationItem-page:hover{
    background-color: #dae6f4;
    border: 1px solid #79aee3;
  }
  .MuiPagination-ul li{
    margin: 0 5px;
  }
  .MuiPagination-ul li .MuiPaginationItem-previousNext{
    border:none;
    font-size: 20px;
  }
  .MuiPagination-ul li .MuiPaginationItem-previousNext:hover{
    background-color: transparent
  }
  .pollDetail{
    width: 80%;
    margin: 100px auto;
    background-color: rgb(236, 245, 253);
    padding: 20px 38px 38px;
    border: 1px solid #ccc;
    border-radius: 1.5rem;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
}
  .textfield .MuiInputBase-root{
    border: 0px solid transparent;
    outline:none;
    resize: none;
    border-radius: 10px;
    background-color:#fff;
    box-shadow: inset 6px 6px 8px rgb(18 46 101 / 8%);
  }
  .textfield .MuiInputBase-root:focus{
    box-shadow:none;
  }
  textarea.MuiInputBase-input{
    font-size: 0.975rem ;
    font-family: Montserrat;
  }
  .textfield .PrivateNotchedOutline-root-1{
    border:none;
  }

  textarea.MuiInputBase-input:focus div.MuiInputBase-root{
    background-color: #fff;
    border-color: #8ad4ee;
    outline: 0;
    border-radius: 10px;
    box-shadow: 0 0 0 0.2rem rgb(32 168 216 / 25%);
  }
  #zeropadding {
    padding:0;
    max-width: 203px;
  }
  .flex-col{
    display:flex;
    flex-direction: column;
  }
  .align-center{
    text-align: center;
  }
  .flex-row{
    display:inline-flex;
  }
  .formPollDetail{

  }
  .ant-switch {
    width: 60px;
  }
  .imgDeletePoll{
    width: 140px;
    display: block;
    margin: 0 auto 15px;
  }
  div.css-1t1j96h-MuiPaper-root-MuiDialog-paper{
  min-width: 450px;
  border-radius: 10px;
  font-family: Montserrat;
  padding-bottom: 18px;
  }
  div.dialogActionsDelete{
    justify-content: space-evenly;
  }
  .rowspace{
    justify-content: space-between;
    width: 55%;
  }
  div.css-ypiqx9-MuiDialogContent-root{
    padding: 20px 24px 10px;
  }
  button.keepPollBtn{
    border: 0px;
    font-size: 15px;
    margin: 0px;
    background-color: rgb(237, 237, 237);
    height: 38px;
    width: 142px;
    color: #222222;
    border-radius: 12px;
    text-transform: none;
    box-shadow: 0 5px 11px rgb(0 0 0 / 25%);
  }
  #deletePollBtn{
    color:#fff;
    border: 0px;
    font-size: 15px;
    margin: 0px;
    background-color: rgb(220, 38, 127);
    height: 38px;
    text-transform: none;
    width: 142px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgb(0 0 0 / 25%);}
    button.keepPollBtn:hover,
    #deletePollBtn:hover{
      opacity: 0.8;
    }
    .labelPollDetail{
      margin-bottom: 10px;
    }
    button.btnUpdate{
    border: 0px;
    font-size: 0.975rem;
    margin: 0px;
    margin-top:30px;
    background-color: rgb(255, 176, 0);
    height: 38px;
    width: 187px;
    align-self:end;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
    color:#fff;
    text-transform: none;
    }
    button.btnUpdate:hover{
      background-color:rgb(255, 176, 0);
      opacity:0.8;
    }
    .mt10{
      margin-top: 10px;
    }
    div.labelDate{
      margin-right:10px;
      margin-left:20px;
      margin-bottom: 15px;
    }
    .input_login.bKgTJT .MuiOutlinedInput-root{
      padding: 0;
    }
`;

export default GlobalStyle;
