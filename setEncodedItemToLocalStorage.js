//  public/scripts/setEncodedItemToLocalStorage.js
//  requires "/js/rawdeflate.js".

    function setEncodedItemToLocalStorage(key, data){
        localStorage.setItem(key, window.btoa( RawDeflate.deflate( JSON.stringify( data ) ) ) );
    }
