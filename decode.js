//  public/scripts/decode.js

    function decode( string ) {
        return RawDeflate.inflate( window.atob( string ) );
    }
