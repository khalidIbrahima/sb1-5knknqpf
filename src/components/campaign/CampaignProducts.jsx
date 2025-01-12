import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';
import { ProductCard } from '../ProductCard';
import { SearchInput } from '../admin/SearchInput';

export const CampaignProducts = ({ campaign }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = campaign.products?.filter(product => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  });

  const activeProducts = filteredProducts?.filter(p => p.isActive) || [];
  const inactiveProducts = filteredProducts?.filter(p => !p.isActive) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Produits de la campagne</h2>
      
      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher un produit..."
        />
      </div>

      <div className="space-y-4">
        <CollapsibleSection 
          title={`Produits actifs (${activeProducts.length})`}
          defaultOpen={true}
        >
          <div className="grid gap-4">
            {activeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title={`Produits inactifs (${inactiveProducts.length})`}
          defaultOpen={false}
        >
          <div className="grid gap-4">
            {inactiveProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};