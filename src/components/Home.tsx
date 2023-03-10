import { useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  type SelectChangeEvent,
  Checkbox,
  ListItemText,
  MenuItem,
  ButtonGroup,
  capitalize,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { get } from "../api";
import ProductView from "./ProductView";
import "./Home.scss";
import { sortAndFilterProduct } from "../utils/productUtils";

const Home = () => {
  //states
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [productView, setProductView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1, 250]);

  //consts
  const productTypes = useMemo(
    () => [...new Set(products.map((product) => product.product_type))],
    [products]
  );

  const productsResult: Product[] = useMemo(
    () => sortAndFilterProduct(products, sortBy, selectedTypes, priceRange),
    [products, sortBy, selectedTypes, priceRange]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get<any[]>(
          "/best-selling-products-by-subcategory"
        );
        const products = response.map((product) => ({
          id: product.id,
          title: product.title,
          product_type: product.product_type,
          image: product.image,
          quantitySold: product.quantitySold,
          variants: product.variants,
        }));
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleProductTypeChange = (
    event: SelectChangeEvent<typeof selectedTypes>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedTypes(typeof value === "string" ? value.split(",") : value);
  };

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
  };

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress size={70} />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Grid container direction="row">
        <Grid item xs={12} className="buttons-container">
          <Grid container>
            <Grid item xs={3}>
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                startIcon={<FilterListIcon />}
                variant="outlined"
                className="filter-button"
              >
                Filters
              </Button>
            </Grid>
            <Grid item xs={9} className="buttons-right">
              <ButtonGroup className="mode-view-button">
                <Button
                  fullWidth
                  startIcon={<GridViewIcon />}
                  onClick={() => setProductView("grid")}
                />
                <Button
                  fullWidth
                  startIcon={<FormatListBulletedIcon />}
                  onClick={() => setProductView("list")}
                />
              </ButtonGroup>
              <FormControl className="sort-control">
                <InputLabel>Sort results</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortByChange}
                  label="Sort results"
                >
                  <MenuItem value="nameAsc">A-Z</MenuItem>
                  <MenuItem value="nameDesc">Z-A</MenuItem>
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={openFilter}>
                <Grid container spacing={2} className="filters-container">
                  <Grid item xs={12} md={4}>
                    <FormControl className="product-type">
                      <InputLabel>Product Type</InputLabel>
                      <Select
                        multiple
                        input={<OutlinedInput fullWidth label="Product Type" />}
                        value={selectedTypes}
                        onChange={handleProductTypeChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={capitalize(value)} />
                            ))}
                          </Box>
                        )}
                      >
                        {productTypes.map((productType, index) => (
                          <MenuItem
                            key={`${productType}-${index}`}
                            value={productType}
                          >
                            <Checkbox
                              checked={selectedTypes.indexOf(productType) > -1}
                            />
                            <ListItemText primary={capitalize(productType)} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} className="price-slider">
                    <Typography>Price Range</Typography>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={1}
                      max={300}
                      getAriaValueText={(value) => `$${value}`}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="products-container">
          <ProductView products={productsResult} view={productView} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
