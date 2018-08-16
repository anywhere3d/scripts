//  public/scripts/encode.js

    function encode( string ) {
        return window.btoa( RawDeflate.deflate( string ) );
    }
