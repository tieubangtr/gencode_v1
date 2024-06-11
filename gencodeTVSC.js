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
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];
    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
      _fromQuery += ` [FromQuery] ${propType == "DateTime" ? "string" : propType} ${propName},`;

    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
      // _fromQuery += ` [FromQuery] ${prefix} ${propType == "DateTime" ? "string" : propType} ${propName},`;
    }

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
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];

    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];

      if (propType == "DateTime") {
        _result += ` _${propName}, `;
      } else {
        _result += ` ${propName}, `;
      }
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];

      if (propType == "DateTime") {
        _result += `${prefix} _${propName}, `;
      } else {
        _result += `${prefix} ${propName}, `;
      }

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
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];
    console.log("propType", propType);
    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
    }

    if (prefix != "ref" && propType != "DataSet" && propType != "DataTable") {
      if (propType == 'DateTime') {
        _result += `request.AddParameter("${propName}", ${propName}.ToDateTimeStringN0(), ParameterType.QueryString);\n`;
      } else {
        _result += `request.AddParameter("${propName}", ${propName}, ParameterType.QueryString);\n`;
      }
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

function GenClassObj() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];

    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
    }

    _result += `public ${propType} ${capitalizeAfterUnderscore(propName)} {get;set;}\n`;
  }

  _result = _result.trim();
  copyStringToClipboard(_result);
}

function AssignReturnObj_Equal_Data() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];

    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
    }

    _result += `returnObj.${capitalizeAfterUnderscore(propName)} = ${propName};\n`;
  }

  _result = _result.trim();
  copyStringToClipboard(_result);
}


function AssignData_Equal_ReturnObj() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var param = listPara[i].trim();
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];

    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
    }
    if (prefix == "ref") {
      _result += `${propName} = returnObj.${capitalizeAfterUnderscore(propName)};\n`;
    }
  }

  _result = _result.trim();
  copyStringToClipboard(_result);
}

function DeclareRef() {
  _textPara = document.getElementById("txtTVSC").value;
  listPara = _textPara.split(',');
  var _result = '';
  for (let i = 0; i < listPara.length; i++) {
    var defaultValue = "";
    var param = listPara[i].trim();
    var propType = "";
    var propName = "";
    var prefix = param.trim().split(' ')[0];

    if (prefix != "ref") {
      propType = param.trim().split(' ')[0]
      propName = param.trim().split(' ')[1];
    } else {
      propType = param.trim().split(' ')[1]
      propName = param.trim().split(' ')[2];
    }



    if (propType == "string") {
      defaultValue = "\"\"";
    } else if (propType == "decimal" || propType == "int") {
      defaultValue = "0";
    } else {
      defaultValue = `new ${propType}()`;
    }

    if (prefix == "ref") {
      _result += `${propType} ${propName} = ${defaultValue};\n`;
    }
  }

  _result = _result.trim();
  copyStringToClipboard(_result);
}