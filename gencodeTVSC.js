var testString = "strSTAFF_CODE,strSTAFF_NAME,strPOSITION,strBRANCH_CODE,strAREA_CODE,strPHONE,strEMAIL,strFAX,strACCOUNT_PAYMENT,strIDTYPE,strIDCODE,strTAX_CODE,strSTATUS,strACTYPE,strIS_ACTIVE,strCREATEBY,dCREATEDATE,strBANKCODE,strBRANCH_BANK,strDEPARTMENT,strBROKERFEEID,dMONTH_REVENUE,strBROKER_MAN,strBROKER_AUTH,strIsBM";


var _textPara = "";
var listPara = [];


function Gen_FromQuery() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  // console.clear();
  // console.log("___________________Start FromParamGenTVSC");
  var _fromQuery = '';

  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = param.trim().split(' ')[0]
    var propName = param.trim().split(' ')[1];
    _fromQuery += ` [FromQuery] ${propType == "DateTime" ? "string" : propType} ${propName},`;
  }
  _fromQuery = _fromQuery.trim();
  _fromQuery = _fromQuery.slice(0, _fromQuery.length - 1)//xoa dấu phẩy cuối cùng
  copyStringToClipboard(_fromQuery);
  // console.log(_fromQuery);
  // console.log("___________________End FromParamGenTVSC");
}

function GenParamSendToDA() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = param.trim().split(' ')[0]
    var propName = param.trim().split(' ')[1];
    console.log(param);
    if (propType == "DateTime") {
      _result += ` _${propName}, `;
    } else {
      _result += ` ${propName}, `;
    }
  }
  _result = _result.trim();
  _result = _result.slice(0, _result.length - 1)//xoa dấu phẩy cuối cùng
  copyStringToClipboard(_result);
}



function GenAddParmeter() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = 'request.AddHeader("Authorization", $"Bearer {ConfigInfo.Token}");\n';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = param.trim().split(' ')[0]
    var propName = param.trim().split(' ')[1];
    if (propType == 'DateTime') {
      _result += `request.AddParameter("${propName}", ${propName}.ToDateTimeStringN0(), ParameterType.QueryString);\n`;
    } else {
      _result += `request.AddParameter("${propName}", ${propName}, ParameterType.QueryString);\n`;

    }
  }
  _result = _result.trim();
  copyStringToClipboard(_result);
}

function JustCopy() {
  _textPara = document.getElementById("txtTVSC").value;
  copyStringToClipboard(_textPara);
}

function GenLogMessage() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = param.trim().split(' ')[0]
    var propName = param.trim().split(' ')[1];

    _result += `+ " ,${propName}=" + ${propName}`;


  }
  _result = _result.trim();
  copyStringToClipboard(_result);
}

function GenStringToDateTime() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = param.trim().split(' ')[0]
    var propName = param.trim().split(' ')[1];

    if (propType == "DateTime") {
      _result += `DateTime _${propName} = CommonLib.ConvertString2Date(${propName});\n`;

    }


  }
  _result = _result.trim();
  copyStringToClipboard(_result);
}