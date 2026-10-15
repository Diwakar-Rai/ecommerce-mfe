
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { addToCart } from "../events/cartEvents";

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <section className="empty-state">
        <h1>Product not found</h1>
        <Link to="/" className="primary-button">
          Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="details-layout">
      <div className="details-art">
        <span>{product.emoji}</span>
      </div>

      <div className="details-content">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="details-description">
          {product.description}
        </p>

        <p className="details-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <button
          className="primary-button"
          onClick={() =>
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>

        <p>
          <Link to="/" className="back-link">
            ← Back to all products
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
