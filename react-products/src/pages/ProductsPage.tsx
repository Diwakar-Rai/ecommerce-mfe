import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import type { Product } from "../data/products";
import type { AddToCartDetail } from "../events/cartEvents";
import { addToCart } from "../events/cartEvents";

type ProductsPageProps = {
  onAddToCart?: (item: AddToCartDetail) => void;
};

function ProductsPage({ onAddToCart }: ProductsPageProps) {
  function handleAddToCart(product: Product) {
    const item: AddToCartDetail = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    if (onAddToCart) {
      onAddToCart(item);
    } else {
      addToCart(item);
    }
  }

  return (
    <section className="products-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OUR COLLECTION</p>
          <h1>Discover Products</h1>
          <p className="muted">Find something you'll love.</p>
        </div>

        <span className="product-count">{products.length} products</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <Link
              to={`/${product.id}`}
              className="product-art"
              aria-label={`View ${product.name}`}
            >
              <span>{product.emoji}</span>
            </Link>

            <div className="product-info">
              <p className="category">{product.category}</p>

              <Link to={`/${product.id}`} className="product-name">
                {product.name}
              </Link>

              <p className="product-description">{product.description}</p>

              <div className="product-card-footer">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>

                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
