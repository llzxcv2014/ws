# WebSocket API

## 可以使用websocket的协议

1. 已注册的协议
2. 公开的协议
3. 定制的协议

## 事件

### open

当WebSocket服务器对连接请求进行响应，握手完成，open事件触发，连接建立便可以发送和接受消息。

```javascript
// WebSocket connection established
ws.onopen = function(e) {
    console.log("Connection established");
    ws.send(JSON.stringify(stock_request));
};

```

### message

连接建立后便可以发送和接收消息。

```javascript
// UI update function
var changeStockEntry = function(symbol, originalValue, newValue) {
    var valElem = $('#' + symbol + ' span');
    valElem.html(newValue.toFixed(2));
    if (newValue < originalValue) {
        valElem.addClass('label-danger');
        valElem.removeClass('label-success');
    } else if (newValue > originalValue) {
        valElem.addClass('label-success');
        valElem.removeClass('label-danger');
    }
}
// WebSocket message handler
ws.onmessage = function(e) {
    var stocksData = JSON.parse(e.data);
    for (var symbol in stocksData) {
        if (stocksData.hasOwnProperty(symbol)) {
            changeStockEntry(symbol, stocks[symbol], stocksData[symbol]);
            stocks[symbol] = stocksData[symbol];
        }
    }
};
```

### error

当出现错误出现时，出触发错误事件。连接会关闭并触发关闭事件。关闭事件会在错误事件不久后触发。

```javascript
ws.onerror = function(e) {
    console.log("WebSocket failure, error", e);
    handleErrors(e);
};

```

### PING/PONG

WebSocket使用两种Frame类型：PING和PONG。
JS的WebSocket客户端API发送一个PING Frame到服务器。PING只能被服务器发送，浏览器实现应当发送一个PONG frame作为回应。

### close

```javascript
ws.onclose = function(e) {
    console.log(e.reason + " " + e.code);
    for (var symbol in stocks) {
        if (stocks.hasOwnProperty(symbol)) {
            stocks[symbol] = 0;
        }
    }
}
ws.close(1000, 'WebSocket connection closed')
```

## WebSocket方法

### send

发送消息。

### close

关闭连接。

在关闭方法调用后，不能在这个连接上发送和接收消息。

可以传入状态码，和一段字符串显示连接关闭原因

```javascript
// Close the WebSocket connection with reason.
ws.close(1000, "Goodbye, World!");
```

|状态码|名称|描述
|-----|:----:|:---:|
|0-999||保留不使用|
|1000|CLOSE_NORMAL|正常关闭，连接成功完成|
|1001|CLOSE_GOING_AWAY|
|1002|CLOSE_PROYOCOL_ERROR|协议错误|
|1003|CLOSE_UNSUPPORTED|数据类型不支持|
|1004|CLOSE_TOO_LARGE|data frame太大|
|1005|CLOSE_NO_STATUS|没有提供任何状态码|
|1006|CLOSE_ABNORMAL|连接非正常关闭|
|1007-1999||为将来的标准保留|
|2000-2999||为扩展保留|
|3000-3999||用于框架和库|
|4000-4999||用于应用程序|

## WebSocket属性

### readyState

只读，显示连接的状态

|属性名|属性值|描述|
|:----|:---:|:---:|
|WebSocket.CONNECTING|0|连接还没打开|
|WebSocket.OPEN|1|连接打开准备通信|
|WebSocket.CLOSING|2|连接正在关闭|
|WebSocket.CLOSED|3|连接已关闭|