import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
  capitalize,
} from "@mui/material";
import { type FC } from "react";
import { getMinAndMaxPrice } from "../../../utils/productUtils";
import "./ProductCardItem.scss";

type ProductCardItemProps = {
  product: Product;
};

const ProductCardItem: FC<ProductCardItemProps> = ({ product }) => {
  const [minPrice, maxPrice] = getMinAndMaxPrice(product);

  return (
    <Card className="product-card-container">
      <CardMedia
        component="img"
        height="200"
        image={product.image.src}
        alt="Product image"
        className="product-image"
      />
      <Divider>
        <Chip
          label={
            maxPrice === minPrice
              ? `$${minPrice}`
              : `$${minPrice} - $${maxPrice}`
          }
          color="success"
        />
      </Divider>
      <CardContent>
        <Typography
          gutterBottom
          component="h1"
          variant="h6"
          className="product-title"
        >
          {product.title}
        </Typography>
        <div className="product-detail">
          <Typography variant="body2" color="text.secondary">
            Type:{" "}
            <span className="item-detail-value">
              {capitalize(product.product_type)}
            </span>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Quantity Sold:{" "}
            <span className="item-detail-value">{product.quantitySold}</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardItem;
