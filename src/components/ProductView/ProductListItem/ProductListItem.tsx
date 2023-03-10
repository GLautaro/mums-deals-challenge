import { Typography, capitalize, Divider, Chip, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { type FC } from "react";
import { getMinAndMaxPrice } from "../../../utils/productUtils";
import "./ProductListItem.scss";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  const [minPrice, maxPrice] = getMinAndMaxPrice(product);

  return (
    <>
      <div className="product-list-container">
        <div className="img-container">
          <img
            width={125}
            src={product.image.src}
            className="product-list-image"
            alt="Product Image"
          />
        </div>
        <div className="product-list-details">
          <Typography gutterBottom component="h1" variant="h6">
            {product.title}
          </Typography>
          <div className="price-container">
            <Chip
              label={
                maxPrice === minPrice
                  ? `$${minPrice}`
                  : `Price Range: $${minPrice} - $${maxPrice}`
              }
              color="success"
            />
            {minPrice !== maxPrice && (
              <Tooltip arrow title="This product has variants with different prices">
                <InfoOutlinedIcon />
              </Tooltip>
            )}
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Type:{" "}
              <span className="item-list-detail-value">
                {capitalize(product.product_type)}
              </span>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Quantity Sold:{" "}
              <span className="item-list-detail-value">
                {product.quantitySold}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <Divider sx={{ marginTop: 4 }} />
    </>
  );
};

export default ProductListItem;
