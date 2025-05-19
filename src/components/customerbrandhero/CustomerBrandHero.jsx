import React from "react";
import images from "../../constants/images";

const CustomerBrandHero = ({ getsingalmalldata }) => {
    // ("aaaaaa", getsingalmalldata);
    return (
        <div className="mall_hero_main_wrapp">
            <img
                src={
                    getsingalmalldata.banner_mall_path === null
                        ? images.mall_hero_banner
                        : getsingalmalldata.banner_mall_path
                }
                alt=""
                className="mall_hero_banner_img img_fluid_position"
            />
            <div className="mall_hero_logo_wrapp">
                <img
                    src={
                        getsingalmalldata.shopping_center_thumbnail_mall_path === null
                            ? images.mall_hero_logo
                            : getsingalmalldata.shopping_center_thumbnail_mall_path
                    }
                    alt=""
                />
            </div>
        </div>
    );
};

export default CustomerBrandHero;
