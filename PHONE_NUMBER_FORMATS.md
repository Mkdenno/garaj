# Phone Number Formats by Country

## Overview
All garages now have realistic, country-specific phone numbers with proper formatting and area codes.

## Phone Number Formats

### 🇰🇪 Kenya
- **Format**: `+254 7XX XXXXXX`
- **Example**: `+254 712 345678`
- **Details**:
  - Country code: +254
  - Mobile prefix: 7XX (700-799)
  - 9 digits total after country code
  - Common carriers: Safaricom, Airtel, Telkom

### 🇺🇸 USA
- **Format**: `+1 (XXX) XXX-XXXX`
- **Example**: `+1 (212) 555-1234`
- **Details**:
  - Country code: +1
  - Area codes by city:
    - New York: 212
    - Los Angeles: 310
    - Chicago: 312
    - Houston: 713
    - Phoenix: 602
    - Philadelphia: 215
    - San Antonio: 210
    - San Diego: 619
    - Dallas: 214
    - San Jose: 408
  - 10 digits total (including area code)

### 🇬🇧 UK
- **Format**: `+44 XX XXXX XXXX`
- **Example**: `+44 20 7123 4567`
- **Details**:
  - Country code: +44
  - Area codes by city:
    - London: 20
    - Manchester: 161
    - Birmingham: 121
    - Leeds: 113
    - Glasgow: 141
    - Liverpool: 151
    - Newcastle: 191
    - Sheffield: 114
    - Bristol: 117
    - Edinburgh: 131
  - 10-11 digits total

### 🇮🇳 India
- **Format**: `+91 XX XXXX XXXX`
- **Example**: `+91 22 2345 6789`
- **Details**:
  - Country code: +91
  - STD codes by city:
    - Mumbai: 22
    - Delhi: 11
    - Bangalore: 80
    - Hyderabad: 40
    - Chennai: 44
    - Kolkata: 33
    - Pune: 20
    - Ahmedabad: 79
    - Jaipur: 141
    - Surat: 261
  - 10 digits total after country code

### 🇦🇺 Australia
- **Format**: `+61 X XXXX XXXX`
- **Example**: `+61 2 9123 4567`
- **Details**:
  - Country code: +61
  - Area codes by city:
    - Sydney: 2
    - Melbourne: 3
    - Brisbane: 7
    - Perth: 8
    - Adelaide: 8
    - Gold Coast: 7
    - Canberra: 2
    - Newcastle: 2
    - Wollongong: 2
    - Hobart: 3
  - 9 digits total after country code

### 🇿🇦 South Africa
- **Format**: `+27 XX XXX XXXX`
- **Example**: `+27 11 123 4567`
- **Details**:
  - Country code: +27
  - Area codes by city:
    - Johannesburg: 11
    - Cape Town: 21
    - Durban: 31
    - Pretoria: 12
    - Port Elizabeth: 41
    - Bloemfontein: 51
    - East London: 43
    - Polokwane: 15
    - Nelspruit: 13
    - Kimberley: 53
  - 9 digits total after country code

## Implementation Details

### Generation Logic
- Each country has a `phoneFormat` function
- Uses city-specific area codes
- Generates random but realistic numbers
- Maintains proper formatting with spaces and parentheses

### Click-to-Call
All phone numbers are clickable and will:
- Open the phone dialer on mobile devices
- Open calling apps on desktop (Skype, FaceTime, etc.)
- Format: `tel:+XXXXXXXXXXX`

### Display Format
- Numbers displayed with country-specific formatting
- Easy to read with proper spacing
- Includes country code for international clarity

## Benefits

✅ **Realistic**: Proper country codes and area codes
✅ **Functional**: Click-to-call on all devices
✅ **Professional**: Properly formatted for each region
✅ **Recognizable**: Users can identify local numbers
✅ **International**: Clear country codes for global use
✅ **Consistent**: Same format across all garages in a country

## Technical Notes

### Random Generation
- Numbers are randomly generated but follow real patterns
- Area codes match the city where the garage is located
- No duplicate numbers (statistically unlikely with large ranges)

### Format Preservation
- Original format maintained in database
- Displayed consistently across all views
- Works with search and filtering

### Future Enhancements
- Mobile number validation
- WhatsApp integration
- SMS support
- Call tracking analytics
