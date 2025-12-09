export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'buy' | 'sell' | 'rent';
  images: string[];
  location: string;
  sellerId: string;
  status: 'active' | 'sold' | 'inactive';
  createdAt: string;
}

export interface Auction {
  id: string;
  itemId: string;
  startPrice: number;
  currentBid: number;
  highestBidder?: string;
  endTime: string;
  status: 'active' | 'ended';
}

export interface MarketplaceChatMessage {
  id: string;
  itemId: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}
