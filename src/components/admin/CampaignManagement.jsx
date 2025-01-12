import React, { useState, useEffect } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import { CampaignForm } from './CampaignForm';
import { CampaignList } from './CampaignList';
import { CampaignProductsManager } from './CampaignProductsManager';
import { SearchInput } from './SearchInput';

export const CampaignManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { campaigns, loading, error, endCampaign, fetchCampaigns } = useCampaignStore();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleEndCampaign = async (campaign) => {
    if (window.confirm(`Êtes-vous sûr de vouloir clôturer la campagne "${campaign.name}" ?`)) {
      try {
        await endCampaign(campaign.id);
      } catch (error) {
        console.error('Error ending campaign:', error);
      }
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (!searchQuery) return true;
    return campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div className="text-center py-8">Chargement des campagnes...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Une erreur est survenue lors du chargement des campagnes
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des Campagnes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Nouvelle Campagne
        </button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher une campagne..."
        />
      </div>

      <CampaignList
        campaigns={filteredCampaigns}
        onEndCampaign={handleEndCampaign}
        onSelectCampaign={setSelectedCampaign}
      />

      {showForm && (
        <CampaignForm onClose={() => setShowForm(false)} />
      )}

      {selectedCampaign && (
        <CampaignProductsManager
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};