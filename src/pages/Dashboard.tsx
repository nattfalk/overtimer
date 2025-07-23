import React, { useEffect, useState } from 'react';
import AddLogItemModal from '../components/AddLogItemModal';
import EditLogItemModal from '../components/EditLogItemModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EntryDetailRow from '../components/EntryDetailRow';
import { Minus, Plus } from 'lucide-react';
import ButtonAction from '../components/ButtonAction';
import type { LogItem } from '../common/types';
import WithdrawModal from '../components/WithdrawModal';

interface AccumulatedTime {
  available: { hours: number; minutes: number };
  added: { hours: number; minutes: number };
  withdrawn: { hours: number; minutes: number };
}

const getLogItems = (): LogItem[] => {
  const data = localStorage.getItem('logItems');
  return data ? JSON.parse(data) : [];
};

const saveLogItems = (logItems: LogItem[]) => {
  localStorage.setItem('logItems', JSON.stringify(logItems));
};

const calculateAccumulatedTime = (logItems: LogItem[]): AccumulatedTime => {
  const calculateMinutes = (total: number, item: LogItem) =>
    total + (item.hours * 60) + item.minutes;

  const getHoursAndMinutes = (total: number) => {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return { hours, minutes };
  };

  const totalAdd = logItems
    .filter(item => item.type === 'add')
    .reduce((total, entry) => {
      return calculateMinutes(total, entry);
    }, 0);

  const totalWithdraw = logItems
    .filter(item => item.type === 'withdraw')
    .reduce((total, entry) => {
      return calculateMinutes(total, entry);
    }, 0);

  return {
    available: getHoursAndMinutes(totalAdd - totalWithdraw),
    added: getHoursAndMinutes(totalAdd),
    withdrawn: getHoursAndMinutes(totalWithdraw)
  };
};

const Dashboard: React.FC = () => {
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(3);
  const [editingLogItem, setEditingLogItem] = useState<{ logItem: LogItem; index: number } | null>(null);
  const [deletingLogItem, setDeletingLogItem] = useState<{ logItem: LogItem; index: number } | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    setLogItems(getLogItems());
  }, []);

  const handleAddEntry = (newEntry: LogItem) => {
    if (logItems.some(e => e.date === newEntry.date && e.type === newEntry.type)) {
      setAddError('Det finns redan en post för denna dag.');
      return;
    }
    if (newEntry.hours === 0 && newEntry.minutes === 0) {
      setAddError('Du måste ange ett värde för timmar eller minuter.');
      return;
    }
    const updated = [...logItems, newEntry];
    saveLogItems(updated);
    setLogItems(updated);
    setShowAddModal(false);
    setShowWithdrawModal(false);
    setAddError(null);
  };

  const handleEditEntry = (logItem: LogItem, index: number) => {
    setEditingLogItem({ logItem, index });
    setShowEditModal(true);
  };

  const handleUpdateEntry = (updatedLogItem: LogItem) => {
    if (!editingLogItem) return;

    const updatedLogItems = [...logItems];
    updatedLogItems[editingLogItem.index] = updatedLogItem;
    saveLogItems(updatedLogItems);
    setLogItems(updatedLogItems);
    setShowEditModal(false);
    setEditingLogItem(null);
  };

  const confirmDelete = () => {
    if (!deletingLogItem) return;

    const updatedLogItems = logItems.filter((_, index) => index !== deletingLogItem.index);
    saveLogItems(updatedLogItems);
    setLogItems(updatedLogItems);
    setShowDeleteModal(false);
    setDeletingLogItem(null);
  };

  const handleShowMore = () => {
    setMonthsToShow(prev => prev + 12);
  };

  const sorted = logItems.sort((a, b) => b.date.localeCompare(a.date));
  const displayedMonths = sorted.slice(0, monthsToShow);
  const hasMoreMonths = logItems.length > monthsToShow;

  const accumulated = calculateAccumulatedTime(logItems);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center mb-4">
        <header className="w-full max-w-xs mx-auto mb-6">
          <h1 className="text-2xl font-bold text-center tracking-tight">Övertid</h1>
        </header>

        <main className="w-full max-w-xs mx-auto">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 pb-4 w-full">
              <div className="bg-primary rounded-lg">
                <ButtonAction
                  label="Lägg till övertid"
                  icon={<Plus size={40} className="mb-1 text-primary-foreground" />}
                  onClick={() => setShowAddModal(true)}
                  labelStyle={{ color: 'white' }}
                />
              </div>
              <div className="bg-secondary rounded-lg">
                <ButtonAction
                  label="Gör uttag"
                  icon={<Minus size={40} className="mb-1 text-secondary-foreground" />}
                  onClick={() => setShowWithdrawModal(true)}
                  labelStyle={{ color: 'white' }}
                />
              </div>
            </div>

            <div className="w-full bg-card rounded-lg p-4 text-card-foreground">
              <h2 className="text-lg text-center">Tillgänglig övertid</h2>
              <p className="text-4xl font-bold text-center">
                {accumulated.available.hours}t {accumulated.available.minutes}m
              </p>
              <div className="mt-4 flex flex-col items-center grid grid-cols-2">
                <div>
                  <h3 className="text-sm text-center">Totalt tillagt</h3>
                  <p className="text-sm font-bold text-center">
                    {accumulated.added.hours}t {accumulated.added.minutes}m
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-center">Totalt uttaget</h3>
                  <p className="text-sm font-bold text-center">
                    {accumulated.withdrawn.hours}t {accumulated.withdrawn.minutes}m
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <header className="w-full max-w-xs mx-auto">
                <h2 className="text-md font-bold text-center tracking-tight">Logg</h2>
              </header>
              {displayedMonths.length === 0 && <div className="text-gray-500 text-center">Inga poster ännu.</div>}
              {displayedMonths.map((logItem, index) => {
                const globalIndex = logItems.findIndex(e => e.date === logItem.date);
                return (
                  <EntryDetailRow
                    key={index}
                    logItem={logItem}
                    onEdit={(entry) => handleEditEntry(entry, globalIndex)}
                  />
                );
              })}
              {hasMoreMonths && (
                <button
                  className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dimmed transition mt-4"
                  onClick={handleShowMore}
                >
                  Visa fler
                </button>
              )}
              {displayedMonths.length > 3 && (
                <button
                  className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dimmed transition mt-4"
                  onClick={() => setMonthsToShow(3)}
                >
                  Återställ
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Entry Modal */}
      <AddLogItemModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAddError(null);
        }}
        onAdd={handleAddEntry}
        error={addError}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => {
          setShowWithdrawModal(false);
          setAddError(null);
        }}
        onWithdraw={handleAddEntry}
        error={addError}
      />

      {/* Edit Entry Modal */}
      {editingLogItem && (
        <EditLogItemModal
          logItem={editingLogItem.logItem}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingLogItem(null);
          }}
          onUpdate={handleUpdateEntry}
          onDelete={() => {
            if (editingLogItem) {
              setShowEditModal(false);
              setDeletingLogItem(editingLogItem);
              setShowDeleteModal(true);
            }
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingLogItem(null);
        }}
        onConfirm={confirmDelete}
        message="Vill du verkligen ta bort posten?"
      />

    </div>
  );
};

export default Dashboard; 