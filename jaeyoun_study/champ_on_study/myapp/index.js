// 파일 첨부 부분
function readImage(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const previewImage = document.querySelector("#preview-image");
        previewImage.src = e.target.result;
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  const inputImage = document.querySelector("#input_image");
  
  inputImage.addEventListener("change", (e) => {
    readImage(e.target);
  });
  
  function detailReadImage(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const previewImage = document.querySelector("#detail-image");
        previewImage.src = e.target.result;
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  const detailImage = document.querySelector("#detail_image");
  
  detailImage.addEventListener("change", (e) => {
    detailReadImage(e.target);
  });
  
  // 콤마 부분
  function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
  }
  
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }
  
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }
  
  // 얼리버드 일반판매 부분
  function checkOnlyOne(element) {
    const checkboxes = document.getElementsByName("status");
  
    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
  
    element.checked = true;
  }
  
  var rangeDate = 31; // set limit day
  var setSdate, setEdate;
  $("#from").datepicker({
      dateFormat: 'yy-mm-dd',
      minDate: 0,
      onSelect: function(selectDate){
          var stxt = selectDate.split("-");
              stxt[1] = stxt[1] - 1;
          var sdate = new Date(stxt[0], stxt[1], stxt[2]);
          var edate = new Date(stxt[0], stxt[1], stxt[2]);
              edate.setDate(sdate.getDate() + rangeDate);
  
          $('#to').datepicker('option', {
              minDate: selectDate,
              beforeShow : function () {
                  $("#to").datepicker( "option", "maxDate", edate );
                  setSdate = selectDate;
                  console.log(setSdate)
          }});
          //to 설정
      }
      //from 선택되었을 때
  });
  
  $("#to").datepicker({
      dateFormat: 'yy-mm-dd',
      onSelect : function(selectDate){
          setEdate = selectDate;
          console.log(setEdate)
      }
  });