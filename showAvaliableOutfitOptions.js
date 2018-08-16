// showAvaliableOutfitOptions.js


function showAvaliableOutfitOptions(){
//  version: webspaces-0.1.5-v0.1

    if ( localPlayer.outfit.getGender("male") ){

        $(maleAssetSelector).show();
        $(femaleAssetSelector).hide();
        $(unisexAssetSelector).show();

    } else if ( localPlayer.outfit.getGender("female") ){

        $(maleAssetSelector).hide();
        $(femaleAssetSelector).show();
        $(unisexAssetSelector).show();

    } else {
    
        $(maleAssetSelector).hide();
        $(femaleAssetSelector).hide();
        $(unisexAssetSelector).hide();
    }

//  Show avaliable buttons.
    
    if ( !!localPlayer.outfit.hairs ) 
         $(avatarHairsButtonSelector).show();
    else $(avatarHairsButtonSelector).hide();

    if ( !!localPlayer.outfit.bra ) 
         $(outfitBraButtonSelector).show();
    else $(outfitBraButtonSelector).hide();

    if ( !!localPlayer.outfit.panties ) 
         $(outfitPantiesButtonSelector).show();
    else $(outfitPantiesButtonSelector).hide();

    if ( !!localPlayer.outfit.boxers )
         $(outfitBoxersButtonSelector).show();
    else $(outfitBoxersButtonSelector).hide();

    if ( !!localPlayer.outfit.tshirt )
         $(outfitTshirtButtonSelector).show();
    else $(outfitTshirtButtonSelector).hide();

    if ( !!localPlayer.outfit.tshirt
      && !!localPlayer.outfit.tshirt.material 
      && !!localPlayer.outfit.tshirt.material.materials 
      && localPlayer.outfit.tshirt.material.materials.length > 1 )
         $(outfitTshirtStampButtonSelector).show();
    else $(outfitTshirtStampButtonSelector).hide();

    if ( !!localPlayer.outfit.skirt )
         $(outfitSkirtButtonSelector).show();
    else $(outfitSkirtButtonSelector).hide();

    if ( !!localPlayer.outfit.trousers )
         $(outfitTrousersButtonSelector).show();
    else $(outfitTrousersButtonSelector).hide();

    if ( !!localPlayer.outfit.dress )
         $(outfitDressButtonSelector).show();
    else $(outfitDressButtonSelector).hide();

    if ( !!localPlayer.outfit.shoes )
         $(outfitShoesButtonSelector).show();
    else $(outfitShoesButtonSelector).hide();

}
