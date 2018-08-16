//  public/scripts/getDecodedItemFromLocalStorage.js
//  requires "/js/rawinflate.js".

    function getDecodedItemFromLocalStorage( key ){
        return JSON.parse( RawDeflate.inflate( window.atob( localStorage.getItem( key ) ) ) );
    }
