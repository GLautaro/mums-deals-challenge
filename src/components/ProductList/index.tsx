import { Chip, Divider, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import ProductCardItem from "./ProductCardItem/ProductCardItem";
import "./ProductList.scss";

type ProductListProps = {
  products: Product[];
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  console.log("products: ", products);
  return (
    <div>
      <Divider color="primary">
        <Chip
          color="primary"
          label={`Available Deals: ${products.length} Results`}
        />
      </Divider>
      <Grid container spacing={4} className="products-list-container">
        {products.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <ProductCardItem product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
