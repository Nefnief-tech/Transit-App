# Tests

This directory contains test suites for TransitFlow AI.

## Structure (To Be Implemented)

```
tests/
├── unit/                 # Unit tests
│   ├── backend/
│   ├── frontend/
│   └── ml/
├── integration/          # Integration tests
│   ├── api/
│   ├── database/
│   └── external-apis/
├── e2e/                  # End-to-end tests
│   ├── mobile/
│   └── web/
├── performance/          # Performance tests
├── security/             # Security tests
└── README.md            # This file
```

## Testing Strategy

### Test Pyramid

```
      /\
     /E2E\       <- Few, critical flows
    /------\
   /  INT   \    <- Moderate, key integrations
  /----------\
 /   UNIT     \  <- Many, comprehensive coverage
/--------------\
```

### Coverage Goals

- **Unit Tests**: >80% coverage
- **Integration Tests**: Key workflows covered
- **E2E Tests**: Critical user journeys
- **Performance Tests**: All API endpoints

## Unit Tests

### Backend (Node.js)

**Framework**: Jest

**Location**: `tests/unit/backend/`

**Run Tests**:
```bash
cd backend
npm test
```

**Example**:
```javascript
// tests/unit/backend/services/routing.test.js
describe('Routing Service', () => {
  test('should find shortest path', () => {
    const route = routingService.findShortestPath(originId, destId);
    expect(route).toBeDefined();
    expect(route.duration).toBeLessThan(3600);
  });
});
```

### Frontend (React Native)

**Framework**: Jest + React Testing Library

**Location**: `tests/unit/frontend/`

**Run Tests**:
```bash
cd frontend
npm test
```

**Example**:
```javascript
// tests/unit/frontend/components/RouteCard.test.js
import { render, fireEvent } from '@testing-library/react-native';
import RouteCard from '../src/components/RouteCard';

test('displays route information', () => {
  const route = { origin: 'A', destination: 'B', duration: 30 };
  const { getByText } = render(<RouteCard route={route} />);
  expect(getByText('30 min')).toBeTruthy();
});
```

### ML/AI (Python)

**Framework**: pytest

**Location**: `tests/unit/ml/`

**Run Tests**:
```bash
cd ml
pytest
```

**Example**:
```python
# tests/unit/ml/test_delay_predictor.py
def test_delay_prediction():
    model = DelayPredictor()
    features = prepare_features(sample_data)
    prediction = model.predict(features)
    assert prediction >= 0
    assert prediction <= 60  # Max 60 min delay
```

## Integration Tests

### API Integration

**Location**: `tests/integration/api/`

**Purpose**: Test API endpoints with database

**Example**:
```javascript
// tests/integration/api/routes.test.js
describe('Routes API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  test('POST /api/routes/plan', async () => {
    const response = await request(app)
      .post('/api/routes/plan')
      .send({ origin: 'A', destination: 'B' });
    
    expect(response.status).toBe(200);
    expect(response.body.routes).toBeDefined();
  });
});
```

### Database Integration

**Location**: `tests/integration/database/`

**Purpose**: Test database operations

**Example**:
```javascript
// tests/integration/database/gtfs.test.js
describe('GTFS Database', () => {
  test('imports GTFS data correctly', async () => {
    await importGTFS('test-feed.zip');
    const stops = await db.query('SELECT COUNT(*) FROM stops');
    expect(stops.rows[0].count).toBeGreaterThan(0);
  });
});
```

### External API Integration

**Location**: `tests/integration/external-apis/`

**Purpose**: Test integration with external APIs (mocked or real)

**Example**:
```javascript
// tests/integration/external-apis/translink.test.js
describe('TransLink API', () => {
  test('fetches real-time arrivals', async () => {
    const arrivals = await translinkAPI.getArrivals('51234');
    expect(arrivals).toBeInstanceOf(Array);
  });
});
```

## End-to-End Tests

### Mobile E2E

**Framework**: Detox (for React Native)

**Location**: `tests/e2e/mobile/`

**Run Tests**:
```bash
cd frontend
npm run test:e2e
```

**Example**:
```javascript
// tests/e2e/mobile/search-flow.e2e.js
describe('Search Flow', () => {
  it('should search for a route', async () => {
    await element(by.id('search-input')).typeText('Vancouver Airport');
    await element(by.id('destination-input')).typeText('Downtown');
    await element(by.id('search-button')).tap();
    await expect(element(by.id('route-results'))).toBeVisible();
  });
});
```

### Web E2E

**Framework**: Playwright or Cypress

**Location**: `tests/e2e/web/`

**Run Tests**:
```bash
cd web
npm run test:e2e
```

**Example**:
```javascript
// tests/e2e/web/route-planning.spec.js
test('plan a route', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.fill('#origin', 'Vancouver Airport');
  await page.fill('#destination', 'Downtown');
  await page.click('#search-button');
  await expect(page.locator('.route-card')).toBeVisible();
});
```

## Performance Tests

**Framework**: k6 or Artillery

**Location**: `tests/performance/`

**Purpose**: Load testing and performance benchmarks

**Example**:
```javascript
// tests/performance/api-load.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // 100 virtual users
  duration: '5m',
};

export default function() {
  let response = http.post('http://api.transitflow.ai/routes/plan', {
    origin: 'A',
    destination: 'B',
  });
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## Security Tests

**Framework**: OWASP ZAP, npm audit

**Location**: `tests/security/`

**Purpose**: Vulnerability scanning and security testing

**Run**:
```bash
# Dependency vulnerabilities
npm audit

# OWASP ZAP scan
zap-cli quick-scan http://api.transitflow.ai
```

## Test Data

### Fixtures

**Location**: `tests/fixtures/`

**Content**:
- Sample GTFS data
- Mock API responses
- Test user data
- Sample ML training data

**Example**:
```javascript
// tests/fixtures/routes.js
module.exports = {
  sampleRoute: {
    id: 'route-123',
    origin: { id: '1', name: 'Station A' },
    destination: { id: '2', name: 'Station B' },
    duration: 30,
    transfers: 1,
  },
};
```

### Mock Services

**Location**: `tests/mocks/`

**Purpose**: Mock external APIs for testing

**Example**:
```javascript
// tests/mocks/translink-api.js
class MockTransLinkAPI {
  async getArrivals(stopId) {
    return [
      { route: '99', destination: 'UBC', countdown: 5 },
      { route: '99', destination: 'UBC', countdown: 15 },
    ];
  }
}

module.exports = MockTransLinkAPI;
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm test
      - name: Run integration tests
        run: npm run test:integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Running Tests

### All Tests
```bash
# From root directory
npm run test:all
```

### Specific Test Suites
```bash
# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Performance tests
npm run test:performance
```

### Watch Mode
```bash
# Run tests on file changes
npm run test:watch
```

### Coverage Report
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/index.html
```

## Best Practices

### Unit Tests
- Test one thing at a time
- Use descriptive test names
- Arrange, Act, Assert pattern
- Mock external dependencies
- Fast execution (<100ms per test)

### Integration Tests
- Test realistic scenarios
- Use test database
- Clean up after tests
- Test error cases
- Reasonable execution time

### E2E Tests
- Focus on critical user journeys
- Keep tests independent
- Use stable selectors
- Handle async operations
- Allow longer execution time

### General
- Keep tests maintainable
- Update tests with code changes
- Review test failures promptly
- Maintain test documentation
- Monitor test execution time

## Troubleshooting

### Tests Failing Locally

1. Check environment variables
2. Verify database is running
3. Clear test cache
4. Update dependencies

```bash
# Clear Jest cache
npm run test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Flaky Tests

- Use proper wait/retry mechanisms
- Avoid hard-coded timeouts
- Ensure test isolation
- Check for race conditions

### Slow Tests

- Profile test execution
- Optimize database queries
- Use mocks where appropriate
- Run tests in parallel

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Pytest Documentation](https://docs.pytest.org/)
- [Detox Documentation](https://wix.github.io/Detox/)
- [Playwright Documentation](https://playwright.dev/)

Last Updated: 2024
