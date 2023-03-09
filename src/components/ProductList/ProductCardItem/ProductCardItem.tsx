import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { type FC } from "react";
import "./ProductCardItem.scss"

type ProductCardItemProps = {
  product: Product;
};

const ProductCardItem: FC<ProductCardItemProps> = ({ product }) => {
  return (
    <Card className="product-card-container">
      <CardMedia
        component="img"
        height="200"
        image={product.image.src}
        alt="Product image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product_type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCardItem;
