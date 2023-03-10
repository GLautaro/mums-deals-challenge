import { Chip, Divider, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import ProductCardItem from "./ProductCardItem/ProductCardItem";
import "./ProductList.scss";
import ProductListItem from "./ProductListItem/ProductListItem";

type ProductListGridProps = {
  products: Product[];
};

type ProductViewProps = ProductListGridProps & {
  view: "list" | "grid";
};

const ProductView: FC<ProductViewProps> = ({ products, view }) => {
  return (
    <div>
      <Divider color="primary">
        <Chip
          color="primary"
          label={`Available Deals: ${products.length} Results`}
        />
      </Divider>
      <Grid container spacing={4} className="products-list-container">
        {view === "grid" ? (
          <ProductGrid products={products} />
        ) : (
          <ProductList products={products} />
        )}
      </Grid>
    </div>
  );
};

const ProductGrid: FC<ProductListGridProps> = ({ products }) => {
  return (
    <>
      {products.map((product, idx) => (
        <Grid item xs={12} md={4} key={product.id + idx}>
          <ProductCardItem product={product} />
        </Grid>
      ))}
    </>
  );
};

const ProductList: FC<ProductListGridProps> = ({ products }) => {
  return (
    <>
      {products.map((product, idx) => (
        <Grid item xs={12} key={product.id + idx}>
          <ProductListItem product={product} />
        </Grid>
      ))}
    </>
  );
};

export default ProductView;
