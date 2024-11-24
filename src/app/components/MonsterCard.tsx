import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, TextField, Button } from '@mui/material';
import { PDFGenerator } from './PDFGenerator';

type Action = {
  name: string;
  toHit: number;
  reach: string;
};

type Stats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type MonsterProps = {
  monster: {
    name: string;
    type: string;
    size: string;
    cr: number;
    resistances: string[];
    vulnerabilities: string[];
    stats: Stats;
    lairActions?: string[];
    actions: Action[];
  };
};

export const MonsterCard: React.FC<MonsterProps> = ({ monster }) => {

  const [editableMonster, setEditableMonster] = useState(monster);

  useEffect(() => {
    if (editableMonster.actions.length === 0) {
      const defaultReach = getDefaultReach(editableMonster.size);
      setEditableMonster({
        ...editableMonster,
        actions: [
          {
            name: 'Attack',
            toHit: 0,
            reach: defaultReach,
          },
        ],
      });
    }
  }, [editableMonster.size]); // Ensures default action is set when the size changes

  const handleActionChange = (index: number, field: keyof Action, value: string | number) => {
    const updatedActions = [...editableMonster.actions];
    updatedActions[index] = { ...updatedActions[index], [field]: value };
    setEditableMonster({ ...editableMonster, actions: updatedActions });
  };

  const handleAddAction = () => {
    const defaultReach = getDefaultReach(editableMonster.size);
    setEditableMonster({
      ...editableMonster,
      actions: [...editableMonster.actions, { name: '', toHit: 0, reach: defaultReach }],
    });
  };

  const handleRemoveAction = (index: number) => {
    const updatedActions = [...editableMonster.actions];
    updatedActions.splice(index, 1);
    setEditableMonster({ ...editableMonster, actions: updatedActions });
  };

  const getDefaultReach = (size: string) => {
    switch (size.toLowerCase()) {
      case 'tiny':
      case 'small':
      case 'medium':
        return '5 feet';
      case 'large':
      case 'huge':
        return '10 feet';
      case 'gargantuan':
        return '15 feet';
      default:
        return '5 feet';
    }
  };

  const handleSaveChanges = () => {
    console.log('Saved monster:', editableMonster);
  };

  return (
    <Card>
      <CardHeader title={editableMonster.name || 'Unnamed Monster'} />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Left side: general details */}
          <div>
            <TextField
              label="Name"
              value={editableMonster.name}
              onChange={(e) => setEditableMonster({ ...editableMonster, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <p><strong>Type:</strong> {editableMonster.type}</p>
            <p><strong>Size:</strong> {editableMonster.size}</p>
            <p><strong>Challenge Rating:</strong> {editableMonster.cr}</p>
            <p><strong>Resistances:</strong> {editableMonster.resistances.length ? editableMonster.resistances.join(', ') : 'None'}</p>
            <p><strong>Vulnerabilities:</strong> {editableMonster.vulnerabilities.length ? editableMonster.vulnerabilities.join(', ') : 'None'}</p>
          </div>

          {/* Right side: stats */}
          <div>
            {editableMonster.stats && (
              <div>
                <h3>Stats:</h3>
                <ul>
                  <li><strong>Strength:</strong> {editableMonster.stats.strength}</li>
                  <li><strong>Dexterity:</strong> {editableMonster.stats.dexterity}</li>
                  <li><strong>Constitution:</strong> {editableMonster.stats.constitution}</li>
                  <li><strong>Intelligence:</strong> {editableMonster.stats.intelligence}</li>
                  <li><strong>Wisdom:</strong> {editableMonster.stats.wisdom}</li>
                  <li><strong>Charisma:</strong> {editableMonster.stats.charisma}</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div style={{ marginTop: '20px' }}>
          <h3>Actions</h3>
          {editableMonster.actions.map((action, index) => (
            <div key={index} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <TextField
                label="Name"
                value={action.name}
                onChange={(e) => handleActionChange(index, 'name', e.target.value)}
              />
              <TextField
                label="+ to Hit"
                type="number"
                value={action.toHit}
                onChange={(e) => handleActionChange(index, 'toHit', parseInt(e.target.value) || 0)}
              />
              <TextField
                label="Reach"
                value={action.reach}
                onChange={(e) => handleActionChange(index, 'reach', e.target.value)}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveAction(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={handleAddAction}>
            Add Action
          </Button>
        </div>

        {/* Lair Actions Section */}
        {editableMonster.lairActions && editableMonster.lairActions.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Lair Actions</h3>
            <ul>
              {editableMonster.lairActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <PDFGenerator monster={editableMonster} />
      </CardActions>
    </Card>
  );
};