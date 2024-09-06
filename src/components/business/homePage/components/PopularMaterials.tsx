import { List, Button, Card, Avatar, Space, Image, Tooltip } from 'antd';
import { ArrowRightOutlined, HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const PopularMaterials: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [layoutDirection, setLayoutDirection] = useState('row');

  const materials = [
    {
      id: 1,
      name: 'Rebar',
      avatar: 'path/to/avatar.png',
      image: 'path/to/image.jpg',
      price: '100 USD',
      location: 'Warehouse A',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content of Card 1' }
      ]
    },
    {
      id: 2,
      name: 'Container',
      avatar: 'path/to/avatar.png',
      image: 'path/to/image.jpg',
      price: '100 USD',
      location: 'Warehouse A',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content of Card 1' },
        { id: 2, title: 'Card 2', content: 'This is the content of Card 2' }
      ]
    },
    {
      id: 3,
      name: 'H Steel Column',
      avatar: 'path/to/avatar.png',
      image: 'path/to/image.jpg',
      price: '100 USD',
      location: 'Warehouse A',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content of Card 1' },
        { id: 2, title: 'Card 2', content: 'This is the content of Card 2' },
        { id: 3, title: 'Card 3', content: 'This is the content of Card 3' }
      ]
    },
    {
      id: 4,
      name: 'Water Barrier',
      avatar: 'path/to/avatar.png',
      image: 'path/to/image.jpg',
      price: '120 USD',
      location: 'Warehouse B',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content of Card 1' },
        { id: 2, title: 'Card 2', content: 'This is the content of Card 2' },
        { id: 3, title: 'Card 3', content: 'This is the content of Card 3' },
        { id: 4, title: 'Card 4', content: 'This is the content of Card 4' }
      ]
    },
    {
      id: 5,
      name: 'TTA Materials',
      avatar: 'path/to/avatar.png',
      image: 'path/to/image.jpg',
      price: '150 USD',
      location: 'Warehouse C',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content of Card 1' },
        { id: 2, title: 'Card 2', content: 'This is the content of Card 2' },
        { id: 3, title: 'Card 3', content: 'This is the content of Card 3' },
        { id: 4, title: 'Card 4', content: 'This is the content of Card 4' },
        { id: 5, title: 'Card 5', content: 'This is the content of Card 5' }
      ]
    }
  ];

  const handleSelect = (material: any) => {
    setSelectedMaterial(material);
  };

  useEffect(() => {
    setSelectedMaterial(materials[0]);
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Popular Materials</h3>
        <Button type="link" style={{ color: '#00A57D' }}>
          View More <ArrowRightOutlined />
        </Button>
      </div>

      <List
        grid={{ gutter: 6, column: 8 }}
        dataSource={materials}
        renderItem={(material) => (
          <List.Item
            onClick={() => handleSelect(material)}
            style={{ cursor: 'pointer' }}
          >
            <Button type="link" style={{ color: '#ccc' }}>
              {material.name}
            </Button>
          </List.Item>
        )}
      />

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button
          onClick={() => setLayoutDirection('row')}
          style={{ marginRight: 10 }}
        >
          Row Layout
        </Button>
        <Button onClick={() => setLayoutDirection('column')}>
          Column Layout
        </Button>
      </div>
      {selectedMaterial && (
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            flexWrap: layoutDirection === 'row' ? 'nowrap' : 'wrap',
            flexDirection: layoutDirection === 'row' ? 'row' : 'column',
            overflowX: layoutDirection === 'row' ? 'auto' : 'hidden',
            overflowY: layoutDirection === 'column' ? 'auto' : 'hidden'
          }}
        >
          {selectedMaterial?.cards.map((card: any) => (
            <Card
              key={card.id}
              style={{
                width: '300px',
                marginRight: layoutDirection === 'row' ? 20 : 0,
                marginBottom: layoutDirection === 'column' ? 20 : 0,
                display: layoutDirection === 'row' ? 'inline-block' : 'block'
              }}
            >
              <Meta
                avatar={<Avatar src={selectedMaterial.avatar} />}
                title={<span>{selectedMaterial.name}</span>}
                description={
                  <Space direction="vertical" size="middle">
                    <div>
                      <Image
                        src={selectedMaterial.image}
                        width={200}
                        preview={false}
                      />
                      <Tooltip title="Collect">
                        <HeartOutlined
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                            color: 'red'
                          }}
                        />
                      </Tooltip>
                    </div>
                    <div>{selectedMaterial.price}</div>
                    <div>{selectedMaterial.location}</div>
                    <div>{card.title}</div>
                    <div>{card.content}</div>
                  </Space>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularMaterials;
